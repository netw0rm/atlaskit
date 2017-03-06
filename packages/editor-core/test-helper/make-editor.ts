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
    state: editorState,
    dispatchTransaction: (tr) => {
      const newState = editorView.state.apply(tr);
      editorView.updateState(newState);
      this.handleChange();
    }
  });

  const { refs } = editorState.doc;

  const setTextSelection = function (anchor: number, head?: number) {
    const tr = editorState.tr.setSelection(TextSelection.create(editorState.doc, anchor, head));
    editorView.dispatch(tr);
  };

  // Collapsed selection.
  if ('<>' in refs) {
    setTextSelection(refs['<>']);
  // Expanded selection
  } else if ('<' in refs || '>' in refs) {
    if ('<' in refs === false) {
      throw new Error('A `<` ref must complement a `>` ref.');
    }
    if ('>' in refs === false) {
      throw new Error('A `>` ref must complement a `<` ref.');
    }
    setTextSelection(refs['<'], refs['>']);
  }

  return {
    editorState,
    editorView,
    setTextSelection,
    pluginState: options.plugin.getState(editorState)
  };
};

export interface ProseMirrorWithRefs extends EditorState<Schema<any, any>> {
  doc: RefsNode;
}
