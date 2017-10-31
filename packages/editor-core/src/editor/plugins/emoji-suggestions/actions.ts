import { EditorView } from 'prosemirror-view';
import { EmojiProvider } from '@atlaskit/emoji';
import { pluginKey } from './plugin';

export const insertEmoji = (view: EditorView, emojiId: any) => {
  const { state: { tr, schema, selection: { $from } }, dispatch } = view;
  const { emoji } = schema.nodes;
  const node = emoji.create({ ...emojiId, text: emojiId.fallback || emojiId.shortName });
  const textNode = schema.text(' ');

  dispatch(
    tr
      .replaceWith($from.pos, $from.pos, [ node, textNode ])
      .setMeta(pluginKey, { query: undefined, selectedIndex: -1 })
  );

  if (!view.hasFocus()) {
    view.focus();
  }
};

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

export const dismiss = (view: EditorView) => {
  const { state: { tr }, dispatch } = view;
  dispatch(tr.setMeta(pluginKey, { query: undefined, selectedIndex: -1 }));
};

export const setIndex = (view: EditorView, selectedIndex: number) => {
  const { state: { tr }, dispatch } = view;
  dispatch(tr.setMeta(pluginKey, { selectedIndex }));
};
