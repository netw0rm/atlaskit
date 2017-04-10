import Keymap from 'browserkeymap';
import { EmojiId, EmojiProvider } from '@atlaskit/emoji';

import {
  EditorState,
  EditorView,
  Fragment,
  Plugin,
  PluginKey,
} from '../../prosemirror';
import { reconfigure } from '../utils';
import { inputRulePlugin, destroyRulePluginCache } from './input-rules';
import keymapPlugin from './keymap';
import ProviderFactory from '../../providerFactory';

export type StateChangeHandler = (state: EmojiState) => any;

export interface Options {
  emojiProvider: Promise<EmojiProvider>;
}

export class EmojiState {
  emojiProvider: Promise<EmojiProvider>;
  query?: string;
  queryActive = false;
  anchorElement?: HTMLElement;
  keymap: Keymap;
  blah = 'EmojiPlugin';

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

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  update(state: EditorState<any>) {
    this.state = state;

    if (!this.emojiProvider) {
      return;
    }

    const { docView } = this.view;
    const { emojiQuery } = state.schema.marks;
    const { doc, selection } = state;
    const { from, to } = selection;

    let dirty = false;

    if (doc.rangeHasMark(from - 1, to, emojiQuery)) {
      if (!this.queryActive) {
        dirty = true;
        this.queryActive = true;
      }

      const { nodeBefore, /*nodeAfter*/ } = selection.$from;
      const newQuery = (nodeBefore && nodeBefore.textContent || '').substr(1); // + (nodeAfter && nodeAfter.textContent || '');

      if (this.query !== newQuery) {
        dirty = true;
        this.query = newQuery;
      }
    } else if (this.queryActive) {
      dirty = true;
      this.dismiss();
      return;
    }

    const newAnchorElement = docView.dom.querySelector('[data-emoji-query]') as HTMLElement;
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
      const markType = schema.mark('emojiQuery');

      view.dispatch(
        tr
          .removeMark(0, state.doc.nodeSize - 2, markType)
          .removeStoredMark(markType)
      );
    }

    return true;
  }

  emojiDisabled() {
    const { selection, schema } = this.state;
    return schema.marks.code.isInSet(selection.$from.marks());
  }

  private findEmojiQueryMark() {
    const { state } = this;
    const { doc, schema, selection } = state;
    const { from } = selection;
    const { emojiQuery } = schema.marks;

    let start = from;
    let node = doc.nodeAt(start);

    while (start > 0 && (!node || !emojiQuery.isInSet(node.marks))) {
      start--;
      node = doc.nodeAt(start);
    }

    let end = start;

    if (node && emojiQuery.isInSet(node.marks)) {
      const resolvedPos = doc.resolve(start);
      // -1 is to include : in replacement
      // resolvedPos.depth + 1 to make emoji work inside other blocks e.g. "list item" or "blockquote"
      start = resolvedPos.start(resolvedPos.depth + 1) - 1;
      end = start + node.nodeSize;
    }

    return { start, end };
  }

  insertEmoji(emojiId?: EmojiId) {
    const { state, view } = this;
    const { emoji } = state.schema.nodes;

    if (emoji && emojiId) {
      const { start, end } = this.findEmojiQueryMark();
      const node = emoji.create({ ...emojiId });
      const textNode = state.schema.text(' ');
      const fragment = new Fragment([node, textNode], node.nodeSize + textNode.nodeSize);
      view.dispatch(
        state.tr.replaceWith(start, end, fragment)
      );
    } else {
      this.dismiss();
    }
  }

  subscribeToFactory(providerFactory: ProviderFactory) {
    providerFactory.subscribe('emojiProvider', this.handleProvider);
  }

  handleProvider = (name: string, provider: Promise<any>): void => {
    switch (name) {
      case 'emojiProvider':
        this.setEmojiProvider(provider);
        break;
    }
  }

  setEmojiProvider(emojiProvider: Promise<EmojiProvider>) {
    this.emojiProvider = emojiProvider;
    return emojiProvider;
  }

  setView(view: EditorView) {
    this.view = view;
  }
}

export const stateKey = new PluginKey('emojiPlugin');

export default new Plugin({
  state: {
    init(config, state) {
      return new EmojiState(state);
    },
    apply(tr, pluginState, oldState, newState) {
      // NOTE: Don't call pluginState.update here.
      return pluginState;
    }
  },
  key: stateKey,
  view: (view: EditorView) => {
    reconfigure(view, [inputRulePlugin(view.state.schema), keymapPlugin(view.state.schema)]);
    const pluginState = stateKey.getState(view.state);
    pluginState.setView(view);

    return {
      update(view: EditorView, prevState: EditorState<any>) {
        pluginState.update(view.state, view);
      },

      destroy() {
        destroyRulePluginCache();
      }
    };
  }
});
