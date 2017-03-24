import {
  EditorView,
  TextSelection,
  NodeSelection
} from '../prosemirror';
import {
  Refs,
  BuilderContent,
  coerce,
  offsetRefs
} from './schema-builder';

/**
 * Update the transaction's current selection.
 * This will determine the selection that the editor gets when the transaction is applied.
 */
export function setTextSelection(view: EditorView, anchor: number, head?: number) {
  const { state } = view;
  const tr = state.tr.setSelection(TextSelection.create(state.doc, anchor, head));
  view.dispatch(tr);
};

export function setNodeSelection(view: EditorView, from: number) {
  const { state } = view;
  const tr = state.tr.setSelection(NodeSelection.create(state.doc, from));
  view.dispatch(tr);
};


/**
 * Replace the given range, or the selection if no range is given, with a text node containing the given string
 */
export function insertText(view: EditorView, text: string, from: number, to?: number) {
  const len = text.length;
  let str;
  let pos = from;

  if (text.match(/\~|\*|\`/)) {
    str = text.substr(len - 1, len);
    view.dispatch(view.state.tr.insertText(text.substr(0, len - 1), from, to));
    pos = view.state.selection.from;
  } else {
    str = text;
  }
  if (!view.someProp('handleTextInput', f => f(view, view.state.selection.from, view.state.selection.to, str))) {
    view.dispatch(view.state.tr.insertText(str, pos));
  }
};

/**
 * Replace the current selection with the given content, which may be a fragment, node, or array of nodes.
 *
 * @returns refs from the inserted nodes, made relative to the document
 *   insertion position
 */
export function insert(view: EditorView, content: BuilderContent[]): Refs {
  const { state } = view;
  const { from, to } = state.selection;
  const { nodes, refs } = coerce(content, state.schema);
  const tr = state.tr.replaceWith(from, to, nodes);
  view.dispatch(tr);
  return offsetRefs(refs, from);
}
