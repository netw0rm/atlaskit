import { EditorView } from 'prosemirror-view';

export const insertEmoji = (view: EditorView, emojiId: any) => {
  const { state: { tr, schema, selection: { $from } }, dispatch } = view;
  const { emoji } = schema.nodes;
  const node = emoji.create({ ...emojiId, text: emojiId.fallback || emojiId.shortName });
  const textNode = schema.text(' ');

  dispatch(tr.replaceWith($from.pos, $from.pos, [ node, textNode ]));
  if (!view.hasFocus()) {
    view.focus();
  }
};
