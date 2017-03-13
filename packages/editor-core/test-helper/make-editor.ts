import {
  Plugin,
  Schema,
  EditorState,
  EditorView
} from '../';
import { default as defaultSchema } from './schema';
import { RefsNode, Refs } from './schema-builder';
import { setTextSelection } from './transactions';

/**
 * Build a ProseMirror instance.
 *
 * Initial selection can be indicated using refs:
 *
 * - `<>` -- a collapsed text selection
 * - `<` and `>` -- a range text selection (`<` is from, `>` is to).
 */
export default (options: Options) : EditorInstance => {
  const editorState = EditorState.create({
    doc: options.doc,
    schema: options.schema || defaultSchema,
    plugins: [
      options.plugin
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
    editorView,
    pluginState: options.plugin.getState(editorState),
    plugin: options.plugin,
    refs,
    sel: refs['<>']
  };
};

export interface ProseMirrorWithRefs extends EditorState<Schema<any, any>> {
  doc: RefsNode;
}

export interface Options {
  doc: RefsNode;
  plugin: Plugin;
  place?: HTMLElement;
  schema?: Schema<any, any>;
}

export interface EditorInstance {
  editorView: EditorView;
  pluginState: any;
  plugin: any;
  refs: Refs;
  sel: number;
}
