import { MentionProvider, MentionDescription, isSpecialMention } from '@atlaskit/mention';
import {
  EditorState,
  EditorView,
  Schema,
  Plugin,
  Slice,
  Fragment,
  PluginKey
} from '../../prosemirror';
import { inputRulePlugin } from './input-rules';
import { isMarkTypeAllowedAtCurrentPosition } from '../../utils';
import ProviderFactory from '../../providerFactory';
import { Node } from '../../prosemirror/prosemirror-model/node';
import { Transaction } from '../../prosemirror/prosemirror-state/transaction';
import { analyticsService } from '../../analytics';
import mentionNodeView from './../../nodeviews/ui/mention';
import nodeViewFactory from '../../nodeviews/factory';
import keymapPlugin from './keymap';
import pluginKey from './plugin-key';

export const stateKey: PluginKey = pluginKey;

export type MentionsStateSubscriber = (state: MentionsState) => any;
export type StateChangeHandler = (state: MentionsState) => any;
export type ProviderChangeHandler = (provider?: MentionProvider) => any;

export class MentionsState {
  // public state
  query?: string;
  queryActive = false;
  enabled = true;
  anchorElement?: HTMLElement;
  mentionProvider?: MentionProvider;

  onSelectPrevious = (): boolean => false;
  onSelectNext = (): boolean => false;
  onSelectCurrent = (): boolean => false;
  onTrySelectCurrent = (): boolean => false;

  private changeHandlers: StateChangeHandler[] = [];
  private state: EditorState<any>;
  private view: EditorView;
  private dirty;
  private queryResult?: MentionDescription[];

  private providerChangeHandlers: ProviderChangeHandler[] = [];

  constructor(state: EditorState<any>, providerFactory: ProviderFactory) {
    this.changeHandlers = [];
    this.state = state;
    this.dirty = false;
    providerFactory.subscribe('mentionProvider', this.handleProvider);
  }

  subscribe(cb: MentionsStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: MentionsStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  subscribeToProviderUpdates(cb: ProviderChangeHandler) {
    this.providerChangeHandlers.push(cb);
    if (this.mentionProvider) {
      cb(this.mentionProvider);
    }
  }

  unsubscribeFromProviderUpdates(cb: ProviderChangeHandler) {
    this.providerChangeHandlers = this.providerChangeHandlers.filter(ch => ch !== cb);
  }

  apply(tr: Transaction, state: EditorState<any>) {
    if (!this.mentionProvider) {
      return;
    }

    const { mentionQuery } = state.schema.marks;
    const { doc, selection } = state;
    const { from, to } = selection;

    this.dirty = false;

    const newEnabled = this.isEnabled(state);
    if (newEnabled !== this.enabled) {
      this.enabled = newEnabled;
      this.dirty = true;
    }

    const hasActiveQueryNode = (node) => {
      const mark = mentionQuery.isInSet(node.marks);
      return mark && mark.attrs.active;
    };

    if (this.rangeHasNodeMatchingQuery(doc, from - 1, to, hasActiveQueryNode)) {
      if (!this.queryActive) {
        this.dirty = true;
        this.queryActive = true;
      }

      const { nodeBefore } = selection.$from;
      const newQuery = (nodeBefore && nodeBefore.textContent || '').substr(1);

      if (this.query !== newQuery) {
        this.dirty = true;
        this.query = newQuery;
        if (newQuery.length === 0) {
          this.queryResult = undefined;
        }
      }
    } else if (this.queryActive) {
      this.dirty = true;
      return;
    }
  }

  update(state: EditorState<any>) {
    this.state = state;

    if (!this.mentionProvider) {
      return;
    }

    const newAnchorElement = this.view.dom.querySelector('[data-mention-query]') as HTMLElement;
    if (newAnchorElement !== this.anchorElement) {
      this.dirty = true;
      this.anchorElement = newAnchorElement;
    }

    if (this.dirty) {
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  private notifyProviderSubscribers() {
    this.providerChangeHandlers.forEach(cb => cb(this.mentionProvider));
  }

  private rangeHasNodeMatchingQuery(doc, from, to, query: (node: Node)=> boolean) {
    let found = false;
    doc.nodesBetween(from, to, (node) => {
      if (query(node)) {
        found = true;
      }
    });

    return found;
  }

  disableActiveQuery(): boolean {
    this.queryActive = false;
    this.query = undefined;

    const { state, view } = this;

    if (state) {
      const { schema } = state;
      const { tr } = state;
      const markType = schema.mark('mentionQuery');
      const { start, end } = this.findActiveMentionQueryMark();

      let inactiveMarkEnd = end;
      const lastCharacterIsSpace = this.isNextCharacterSpace(end - 1, state.doc);
      if (lastCharacterIsSpace) {
        inactiveMarkEnd = end - 1;
      }

      const disableMark = schema.mark('mentionQuery', { active: false });
      let transaction = tr
        .removeMark(start, end, markType)
        .removeStoredMark(markType)
        .addMark(start, inactiveMarkEnd, disableMark)
        .removeStoredMark(disableMark);

      if (!lastCharacterIsSpace) {
        transaction = transaction.insertText(' ', end);
      }

      view.dispatch(
        transaction
      );
    }

    return true;
  }

  dismiss(): boolean {
    const transaction = this.generateDismissTransaction();
    if (transaction) {
      const { view } = this;
      view.dispatch(transaction);
    }

    return true;
  }

  generateDismissTransaction(tr?: Transaction): Transaction {
    this.queryActive = false;
    this.query = undefined;

    const { state } = this;

    const currentTransaction = tr ? tr : state.tr;
    if (state) {
      const { schema } = state;
      const markType = schema.mark('mentionQuery');
      const { start, end } = this.findActiveMentionQueryMark();

      return currentTransaction
        .removeMark(start, end, markType)
        .removeStoredMark(markType);
    }

    return currentTransaction;
  }

  isEnabled(state?: EditorState<any>) {
    const currentState = state ? state : this.state;
    const { mentionQuery } = currentState.schema.marks;
    return isMarkTypeAllowedAtCurrentPosition(mentionQuery, currentState);
  }

  private findMentionQueryMarks(active: boolean = true) {
    const { state } = this;
    const { doc, schema } = state;
    const { mentionQuery } = schema.marks;

    const marks: {start, end, query}[] = [];
    doc.nodesBetween(0, doc.nodeSize - 2, (node, pos) => {
      let mark = mentionQuery.isInSet(node.marks);
      if (mark) {
        const query = node.textContent.substr(1).trim();
        if ((active && mark.attrs.active) || (!active && !mark.attrs.active)) {
          marks.push({
            start: pos,
            end: pos + node.textContent.length,
            query
          });
        }

        return false;
      }

      return true;
    });

    return marks;
  }

  private findActiveMentionQueryMark() {
    const activeMentionQueryMarks = this.findMentionQueryMarks(true);
    if (activeMentionQueryMarks.length !== 1) {
      return { start: -1, end: -1, query: ''};
    }

    return activeMentionQueryMarks[0];
  }

  insertMention(mentionData?: MentionDescription, inactiveQueryMark?: { start, end }) {
    const { view } = this;
    view.dispatch(this.generateInsertMentionTransaction(mentionData, inactiveQueryMark));
  }

  generateInsertMentionTransaction(mentionData?: MentionDescription, inactiveQueryMark?: { start, end }, tr?: Transaction): Transaction {
    const { state } = this;
    const { mention } = state.schema.nodes;
    const currentTransaction = tr ? tr : state.tr;

    if (mention && mentionData) {
      const { start, end } = inactiveQueryMark ? inactiveQueryMark : this.findActiveMentionQueryMark();
      const renderName = mentionData.nickname ? mentionData.nickname : mentionData.name;
      const nodes = [mention.create({ text: `@${renderName}`, id: mentionData.id, accessLevel: mentionData.accessLevel })];
      if (!this.isNextCharacterSpace(end, currentTransaction.doc)) {
        nodes.push(state.schema.text(' '));
      }
      this.queryActive = false;
      this.query = undefined;
      return currentTransaction.replaceWith(start, end, nodes);
    } else {
      return this.generateDismissTransaction(currentTransaction);
    }
  }

  isNextCharacterSpace(position: number, doc) {
    try {
      const resolvedPosition = doc.resolve(position);
      return resolvedPosition.nodeAfter && resolvedPosition.nodeAfter.textContent.indexOf(' ') === 0;
    } catch (e) {
      return false;
    }
  }

  handleProvider = (name: string, provider: Promise<any>): void => {
    switch (name) {
      case 'mentionProvider':
        this.setMentionProvider(provider);
        break;
    }
  }

  setMentionProvider(provider?: Promise<MentionProvider>): Promise<MentionProvider> {
    return new Promise<MentionProvider>((resolve, reject) => {
      if (provider && provider.then) {provider
      .then(mentionProvider => {
        if (this.mentionProvider ) {
          this. mentionProvider.unsubscribe('editor-mentionpicker');
          this.queryResult = undefined;
        }

        this.mentionProvider = mentionProvider;
        this.mentionProvider.subscribe('editor-mentionpicker', this.onMentionResult, this.onMentionError);

            // Improve first mentions performance by establishing a connection and populating local search
            this.mentionProvider.filter('');

            this.notifyProviderSubscribers();
            resolve(mentionProvider);
          })
          .catch((e) => {
            this.mentionProvider = undefined;
            this.notifyProviderSubscribers();
          });
      } else {
        this.mentionProvider = undefined;
        this.notifyProviderSubscribers();
      }
    });
  }

  trySelectCurrent() {
    const currentQuery = this.query ? this.query.trim() : '';
    const mentions: MentionDescription[] = this.queryResult ? this.queryResult : [];
    const mentionsCount = mentions.length;

    let exactMatch = this.findExactMatch(currentQuery, mentions);
    if (exactMatch !== null) {
      this.insertMention(exactMatch);
      return true;
    }

    if (!this.mentionProvider) {
      return false;
    }

    const queryInFlight = this.mentionProvider.isFiltering(currentQuery);

    if (!queryInFlight && mentionsCount === 1) {
      this.onSelectCurrent();
      return true;
    }

    if (queryInFlight && mentionsCount === 0) {
      this.disableActiveQuery();
      return true;
    }

    if (!this.query || (!queryInFlight && mentionsCount === 0)) {
      this.dismiss();
    }

    return false;
  }

  private onMentionResult = (mentions: MentionDescription[], query: string) => {
    this.updateQueryResult(mentions, query);
    this.resolveInactiveQuery(mentions, query);
  }

  private updateQueryResult = (mentions: MentionDescription[], query?: string) => {
    if (query && query.length > 0 && query === this.query) {
      this.queryResult = mentions;
    }
  }

  private resolveInactiveQuery = (mentions: MentionDescription[], resultQuery: string) => {
    const { state, view } = this;
    const inactiveQueryMarks = this.findMentionQueryMarks(false);
    if (inactiveQueryMarks.length === 0) {
      return;
    }

    let tr = state.tr;
    inactiveQueryMarks.forEach(inactiveQueryMark => {
      const { start, end, query } = inactiveQueryMark;
      if (resultQuery !== query) {
        return;
      }

      const match = this.findExactMatch(query, mentions);
      if (match !== null) {
        analyticsService.trackEvent('atlassian.editor.mention.resolve.inactive.mention.success');

        tr = this.generateInsertMentionTransaction(match, {
          start: tr.mapping.map(start),
          end: tr.mapping.map(end),
        }, tr);
      } else {
        analyticsService.trackEvent('atlassian.editor.mention.resolve.inactive.mention.no.match');

        const markType = state.schema.mark('mentionQuery', {active: false});
        tr = tr.removeMark(start, end, markType)
          .removeStoredMark(markType)
          .setMeta('addToHistory', false);
      }
    });
    view.dispatch(tr);
  }

  private onMentionError = (error, errorQuery) => {
    const { state, view } = this;

    const inactiveQueryMarks = this.findMentionQueryMarks(false);
    if (inactiveQueryMarks.length === 0) {
      return;
    }

    let tr = state.tr;
    inactiveQueryMarks.forEach(inactiveQueryMark => {
      const { start, end, query } = inactiveQueryMark;
      if (errorQuery !== query) {
        return;
      }

      analyticsService.trackEvent('atlassian.editor.mention.resolve.inactive.mention.error');

      const markType = state.schema.mark('mentionQuery', {active: false});
      tr = tr.removeMark(start, end, markType)
        .removeStoredMark(markType)
        .setMeta('addToHistory', false);
      view.dispatch(tr);
    });
  }

  private findExactMatch(query: string, mentions: MentionDescription[]): MentionDescription | null {
    let filteredMentions = mentions.filter(mention => {
      if (mention.nickname && mention.nickname.toLocaleLowerCase() === query.toLocaleLowerCase()) {
        return mention;
      }
    });

    if (filteredMentions.length > 1) {
      filteredMentions = filteredMentions.filter(mention => isSpecialMention(mention));
    }

    return filteredMentions.length === 1 ? filteredMentions[0] : null;
  }

  setView(view: EditorView) {
    this.view = view;
  }

  insertMentionQuery() {
    const { state } = this.view;
    const node = state.schema.text('@', [state.schema.mark('mentionQuery')]);
    this.view.dispatch(
      state.tr.replaceSelection(new Slice(Fragment.from(node), 0, 0))
    );
    if (!this.view.hasFocus()) {
      this.view.focus();
    }
  }
}

export function createPlugin(providerFactory: ProviderFactory){

  return new Plugin({
    state: {
      init(config, state) {
        return new MentionsState(state, providerFactory);
      },
      apply(tr, prevPluginState, oldState, newState) {
        // NOTE: Don't replace the pluginState here.
        prevPluginState.apply(tr, newState);
        return prevPluginState;
      }
    },
    props: {
      nodeViews: {
        mention: nodeViewFactory(providerFactory, { mention: mentionNodeView }),
      }
    },
    key: pluginKey,
    view: (view: EditorView) => {
      const pluginState: MentionsState = pluginKey.getState(view.state);
      pluginState.setView(view);

      return {
        update(view: EditorView, prevState: EditorState<any>) {
          pluginState.update(view.state);
        },
        destroy() {
          providerFactory.unsubscribe('mentionProvider', pluginState.handleProvider);
        }
      };
    }
  });
}

export interface Mention {
  name: string;
  mentionName: string;
  nickname?: string;
  id: string;
}

const plugins = (schema: Schema<any, any>, providerFactory) => {
  return [createPlugin(providerFactory), inputRulePlugin(schema), keymapPlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
