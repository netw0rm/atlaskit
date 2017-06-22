import { MentionProvider, MentionDescription } from '@atlaskit/mention';
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

  private providerChangeHandlers: ProviderChangeHandler[] = [];

  constructor(state: EditorState<any>, providerFactory: ProviderFactory) {
    this.changeHandlers = [];
    this.state = state;
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

  private notifyProviderSubscribers() {
    this.providerChangeHandlers.forEach(cb => cb(this.mentionProvider));
  }

  update(state: EditorState<any>) {
    this.state = state;

    if (!this.mentionProvider) {
      return;
    }

    const { mentionQuery } = state.schema.marks;
    const { doc, selection } = state;
    const { from, to } = selection;

    let dirty = false;

    const newEnabled = this.isEnabled();
    if (newEnabled !== this.enabled) {
      this.enabled = newEnabled;
      dirty = true;
    }

    if (doc.rangeHasMark(from - 1, to, mentionQuery)) {
      if (!this.queryActive) {
        dirty = true;
        this.queryActive = true;
      }

      const { nodeBefore } = selection.$from;
      const newQuery = (nodeBefore && nodeBefore.textContent || '').substr(1);

      if (this.query !== newQuery) {
        dirty = true;
        this.query = newQuery;
      }
    } else if (this.queryActive) {
      dirty = true;
      this.dismiss();
      return;
    }

    const newAnchorElement = this.view.dom.querySelector('[data-mention-query]') as HTMLElement;
    if (newAnchorElement !== this.anchorElement) {
      dirty = true;
      this.anchorElement = newAnchorElement;
    }

    if (dirty) {
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  dismiss(): boolean {
    this.queryActive = false;
    this.query = undefined;

    const { state, view } = this;

    if (state) {
      const { schema } = state;
      const { tr } = state;
      const markType = schema.mark('mentionQuery');

      view.dispatch(
        tr
          .removeMark(0, state.doc.nodeSize - 2, markType)
          .removeStoredMark(markType)
      );
    }

    return true;
  }

  isEnabled() {
    const { schema } = this.state;
    const { mentionQuery } = schema.marks;
    return isMarkTypeAllowedAtCurrentPosition(mentionQuery, this.state);
  }

  private findMentionQueryMark() {
    const { state } = this;
    const { doc, schema, selection } = state;
    const { from } = selection;
    const { mentionQuery } = schema.marks;

    let start = from;
    let node = doc.nodeAt(start);

    while (start > 0 && (!node || !mentionQuery.isInSet(node.marks))) {
      start--;
      node = doc.nodeAt(start);
    }

    let end = start;

    if (node && mentionQuery.isInSet(node.marks)) {
      const resolvedPos = doc.resolve(start);
      // -1 is to include @ in replacement
      // resolvedPos.depth + 1 to make mentions work inside other blocks e.g. "list item" or "blockquote"
      start = resolvedPos.start(resolvedPos.depth + 1) - 1;
      end = start + node.nodeSize;
    }

    return { start, end };
  }

  insertMention(mentionData?: MentionDescription) {
    const { state, view } = this;
    const { mention } = state.schema.nodes;

    if (mention && mentionData) {
      const { start, end } = this.findMentionQueryMark();
      const renderName = mentionData.nickname ? mentionData.nickname : mentionData.name;
      const nodes = [mention.create({ text: `@${renderName}`, id: mentionData.id, accessLevel: mentionData.accessLevel })];
      if (!this.isNextCharacterSpace()) {
        nodes.push(state.schema.text(' '));
      }
      view.dispatch(state.tr.replaceWith(start, end, nodes));
    } else {
      this.dismiss();
    }
  }

  isNextCharacterSpace() {
    const { $from } = this.state.selection;
    return $from.nodeAfter && $from.nodeAfter.textContent.indexOf(' ') === 0;
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
      if (provider && provider.then) {
        provider
          .then(mentionProvider => {
            this.mentionProvider = mentionProvider;

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

export function createPlugin(providerFactory: ProviderFactory) {
  return new Plugin({
    state: {
      init(config, state) {
        return new MentionsState(state, providerFactory);
      },
      apply(tr, pluginState, oldState, newState) {
        // NOTE: Don't call pluginState.update here.
        return pluginState;
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
