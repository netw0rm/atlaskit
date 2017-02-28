import { Plugin } from '../../';
import { RefsNode } from '../schema-builder';
import {
  EditorState,
  EditorView,
  TextSelection,
  Schema
} from '../../src/prosemirror/future';

import SyncPlugin from '../sync-plugin';
import { processEditorPlugins } from '../../src/utils/index-future';

export interface Options {
  doc: RefsNode;
  plugin: Plugin<any>;
  place: HTMLElement;
  schema: Schema;
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
    schema: options.schema,
    plugins: processEditorPlugins([options.plugin, SyncPlugin]),
    doc: options.doc
  });

  const editorView = new EditorView(options.place, {
    state: editorState
  });

  debugger;
  
  const { refs } = editorState.doc;
  
  const setTextSelection = (anchor: number, head?: number) => {
    const tr = editorState.tr.setSelection(TextSelection.create(editorState.doc, refs['<>']));
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

  return { editorView, editorState, setTextSelection };
};
