import { MentionProvider } from '@atlaskit/mention';
import {
  EditorState,
  EditorView,
  Schema,
  Plugin,
  PluginKey,
  Slice,
  Fragment
} from '../../prosemirror';
import { inputRulePlugin } from './input-rules';
import { isMarkAllowedAtPosition } from '../../utils';
import keymapPlugin from './keymap';
import ProviderFactory from '../../providerFactory';

export type MentionsStateSubscriber = (state: MentionsState) => any;
export type StateChangeHandler = (state: MentionsState) => any;

export class MentionsState {
  // public state
  query?: string;
  queryActive = false;
  anchorElement?: HTMLElement;
  mentionProvider?: MentionProvider;

  onSelectPrevious = (): boolean => false;
  onSelectNext = (): boolean => false;
  onSelectCurrent = (): boolean => false;
  onTrySelectCurrent = (): boolean => false;

  private changeHandlers: StateChangeHandler[] = [];
  private state: EditorState<any>;
  private view: EditorView;

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];
    this.state = state;
  }

  subscribe(cb: MentionsStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: MentionsStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
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

  mentionDisabled() {
    const { schema, selection } = this.state;
    const { mentionQuery } = schema.marks;
    return isMarkAllowedAtPosition(mentionQuery, selection);
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

  insertMention(mentionData?: Mention) {
    const { state, view } = this;
    const { mention } = state.schema.nodes;

    if (mention && mentionData) {
      const { start, end } = this.findMentionQueryMark();
      const renderName = mentionData.nickname ? mentionData.nickname : mentionData.name;
      const nodes = [mention.create({ text: `@${renderName}`, id: mentionData.id })];
      if (!this.isNextCharacterSpace(end)) {
        nodes.push(state.schema.text(' '));
      }
      view.dispatch(
        state.tr.replaceWith(start, end, nodes)
      );
    } else {
      this.dismiss();
    }
  }

  isNextCharacterSpace(end) {
    const { $from } = this.state.selection;
    return $from.nodeAfter && $from.nodeAfter.textContent.indexOf(' ') === 0;
  }

  subscribeToFactory(providerFactory: ProviderFactory) {
    providerFactory.subscribe('mentionProvider', this.handleProvider);
  }

  handleProvider = (name: string, provider: Promise<any>): void => {
    switch (name) {
      case 'mentionProvider':
        this.setMentionProvider(provider);
        break;
    }
  }

  setMentionProvider(provider: Promise<MentionProvider>): Promise<MentionProvider> {
    return new Promise<MentionProvider>((resolve, reject) => {
      provider
        .then(mentionProvider => {
          this.mentionProvider = mentionProvider;
          resolve(mentionProvider);
        })
        .catch(reject);
    });
  }

  setView(view: EditorView) {
    this.view = view;
  }

  isnertMentionQuery () {
    const { state } = this.view;
    const node = state.schema.text('@', [ state.schema.mark('mentionQuery') ]);
    this.view.dispatch(
      state.tr.replaceSelection(new Slice(Fragment.from(node), 0, 0))
    );
  }
}

export const stateKey = new PluginKey('mentionPlugin');

const plugin = new Plugin({
  state: {
    init(config, state) {
      return new MentionsState(state);
    },
    apply(tr, pluginState, oldState, newState) {
      // NOTE: Don't call pluginState.update here.
      return pluginState;
    }
  },
  key: stateKey,
  view: (view: EditorView) => {
    const pluginState = stateKey.getState(view.state);
    pluginState.setView(view);

    return {
      update(view: EditorView, prevState: EditorState<any>) {
        pluginState.update(view.state, view);
      }
    };
  }
});

export interface Mention {
  name: string;
  mentionName: string;
  nickname?: string;
  id: string;
}

const plugins = (schema: Schema<any, any>) => {
  return [plugin, inputRulePlugin(schema), keymapPlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
