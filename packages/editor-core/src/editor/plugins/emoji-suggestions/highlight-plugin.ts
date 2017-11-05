import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';
import { DecorationSet, EditorView } from 'prosemirror-view';
import { Dispatch } from '../../event-dispatcher';
import { replaceWithEmoji } from './actions';
import { parseHighlightedEmojiNode } from './utils';

export const pluginKey = new PluginKey('highlightEmojiPlugin');

export class HighlightEmojiState {
  decorations: DecorationSet = DecorationSet.empty;
  emojis?: any;
}

export const createPlugin = (dispatch: Dispatch) => new Plugin({
  state: {
    init: () => new HighlightEmojiState(),

    apply(tr: Transaction, state: HighlightEmojiState) {
      const meta = tr.getMeta(pluginKey);

      state.decorations = state.decorations.map(tr.mapping, tr.doc);

      if (meta) {
        const newState = {...state, ...meta};
        dispatch(pluginKey, newState);
        return newState;
      }

      return state;
    }
  },
  props: {
    decorations: (state: EditorState) => pluginKey.getState(state).decorations,

    handleClick: (view: EditorView, pos: number, event: Event): boolean => {
      const target = event.target as any;
      if (!target || !target.className || target.className.indexOf('emoji-highligh') === -1) {
        return false;
      }
      const { emojiId, startPos, endPos } = parseHighlightedEmojiNode(target);
      const { emojis } = pluginKey.getState(view.state);

      replaceWithEmoji(view, startPos, endPos, emojis[emojiId]);

      return true;
    }
  },
  key: pluginKey
});

export default createPlugin;
