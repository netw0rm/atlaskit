import {
  Plugin,
  Schema,
  EditorState,
  EditorView,
  TextSelection
} from '../';
import { default as schema } from './schema';
import { RefsNode } from './schema-builder';
import SyncPlugin from './sync-plugin';

export interface Options {
  doc: RefsNode;
  plugin: Plugin;
  place?: HTMLElement;
  schema?: Schema<any, any>;
}

/**
 * Build a ProseMirror instance.
 *
 * Initial selection can be indicated using refs:
 *
 * - `<>` -- a collapsed text selection
 * - `<` and `>` -- a range text selection (`<` is from, `>` is to).
 */
export default (options: Options) => {
  const editorState = EditorState.create({
    doc: options.doc,
    schema,
    plugins: [
      options.plugin,
      SyncPlugin
    ]
  }) as ProseMirrorWithRefs;
  const editorView = new EditorView(options.place || document.body, {
    state: editorState
  });

  const { refs } = editorState.doc;

  // Collapsed selection.
  if ('<>' in refs) {
    setTextSelection(editorView, refs['<>']);
  // Expanded selection
  } else if ('<' in refs || '>' in refs) {
    if ('<' in refs === false) {
      throw new Error('A `<` ref must complement a `>` ref.');
    }
    if ('>' in refs === false) {
      throw new Error('A `>` ref must complement a `<` ref.');
    }
    setTextSelection(editorView, refs['<'], refs['>']);
  }

  return {
    editorState,
    editorView,
    setTextSelection: (anchor: number, head?: number) => setTextSelection(editorView, anchor, head),
    pluginState: options.plugin.getState(editorState)
  };
};

export interface ProseMirrorWithRefs extends EditorState<Schema<any, any>> {
  doc: RefsNode;
}

function setTextSelection (view: EditorView, anchor: number, head?: number) {
  const { state } = view;
  const tr = state.tr.setSelection(TextSelection.create(state.doc, anchor, head));
  view.dispatch(tr);
};
