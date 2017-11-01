import { EditorView } from 'prosemirror-view';
import { EditorState, Transaction } from 'prosemirror-state';
import { EmojiProvider, EmojiDescription } from '@atlaskit/emoji';
import { EmojiSuggestionsProvider } from './provider';
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

export const setEmojiSuggestionsProvider = async (view: EditorView, provider: Promise<EmojiSuggestionsProvider>) => {
  let resolvedProvider: EmojiSuggestionsProvider | null;

  try {
    resolvedProvider = await provider;
  } catch (err) { resolvedProvider = null; }

  // make sure editable DOM node is mounted
  if (view.dom.parentNode) {
    view.dispatch(view.state.tr.setMeta(pluginKey, { emojiSuggestionsProvider: resolvedProvider }));
  }
};

export const dismiss = (state: EditorState, dispatch: (tr: Transaction) => void) => {
  dispatch(state.tr.setMeta(pluginKey, { query: undefined, selectedIndex: -1 }));
};

export const setEmojis = (state: EditorState, dispatch: (tr: Transaction) => void, emojis: EmojiDescription[]) => {
  dispatch(state.tr.setMeta(pluginKey, { emojis }));
};

export const selectCurrent = (state: EditorState, dispatch: (tr: Transaction) => void, selectedIndex?: number) => {
  const pluginState = pluginKey.getState(state);
  const { emojis } = pluginState;
  const index = (typeof selectedIndex === 'number') ? selectedIndex : pluginState.selectedIndex;
  if (index > -1) {
    const emojiId = emojis[index];
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

export const getEmojiSuggestions = async (state: EditorState, dispatch: (tr: Transaction) => void, query: string) => {
  const { emojiSuggestionsProvider, emojiProvider } = pluginKey.getState(state);
  if (!emojiSuggestionsProvider || !emojiProvider) {
    return;
  }
  const searchResult = await emojiSuggestionsProvider.search(query);
  const data: any = [];

  if (Array.isArray(searchResult.emojis)) {
    const { emojis } = searchResult;
    const allEmojis = (emojiProvider as any).emojiRepository.emojis;
    const fallbackMap = {};

    for (let i = 0, len = allEmojis.length; i < len; i++) {
      if (allEmojis[i].fallback) {
        fallbackMap[allEmojis[i].fallback] = allEmojis[i];
      }
    }

    emojis.forEach(emoji => {
      if (fallbackMap[emoji]) {
        data.push(fallbackMap[emoji]);
      }
    });

    return data;
  }
};
