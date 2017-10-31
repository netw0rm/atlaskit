import { EditorView } from 'prosemirror-view';
import { EditorState, Transaction } from 'prosemirror-state';
import { EmojiProvider, EmojiDescription } from '@atlaskit/emoji';
import { pluginKey } from './plugin';
import { wrapIndex } from './utils';

export const setEmojiProvider = async (view: EditorView, provider: Promise<EmojiProvider>) => {
  let resolvedProvider: EmojiProvider | null;

  try {
    resolvedProvider = await provider;
  } catch (err) { resolvedProvider = null; }

  // make sure editable DOM node is mounted
  if (view.dom.parentNode) {
    view.dispatch(view.state.tr.setMeta(pluginKey, { emojiProvider: resolvedProvider }));
  }
};

export const dismiss = (state: EditorState, dispatch: (tr: Transaction) => void) => {
  dispatch(state.tr.setMeta(pluginKey, { query: undefined, selectedIndex: -1 }));
};

export const setEmojis = (state: EditorState, dispatch: (tr: Transaction) => void, emojis: EmojiDescription[]) => {
  dispatch(state.tr.setMeta(pluginKey, { emojis }));
};

export const selectCurrent = (state: EditorState, dispatch: (tr: Transaction) => void) => {
  const { emojis, selectedIndex } = pluginKey.getState(state);
  if (selectedIndex > -1) {
    const emojiId = emojis[selectedIndex];
    const { selection: { $from }, schema, tr } = state;
    const { emoji } = schema.nodes;
    const node = emoji.create({ ...emojiId, text: emojiId.fallback || emojiId.shortName });
    const textNode = schema.text(' ');

    dispatch(
      tr
        .replaceWith($from.pos, $from.pos, [ node, textNode ])
        .setMeta(pluginKey, { query: undefined, selectedIndex: -1 })
    );
  }
};

export const selectNext = (state: EditorState, dispatch: (tr: Transaction) => void) => {
  const { emojis, selectedIndex } = pluginKey.getState(state);
  const index = wrapIndex(emojis, selectedIndex + 1);
  dispatch(state.tr.setMeta(pluginKey, { selectedIndex: index }));
};

export const selectPrevious = (state: EditorState, dispatch: (tr: Transaction) => void) => {
  const { emojis, selectedIndex } = pluginKey.getState(state);
  const index = wrapIndex(emojis, selectedIndex - 1);
  dispatch(state.tr.setMeta(pluginKey, { selectedIndex: index }));
};
