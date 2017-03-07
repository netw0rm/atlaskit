import {
  Plugin,
  Schema,
  EditorState,
  EditorView
} from '../';
import { default as defaultSchema } from './schema';
import { RefsNode, Refs, BuilderContent } from './schema-builder';
import SyncPlugin from './sync-plugin';
import sendKeyToPm from './send-key-to-pm';
import { insert, insertText, setTextSelection } from './transactions';

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
    editorView,
    pluginState: options.plugin.getState(editorState),
    plugin: options.plugin,
    refs,
    sel: refs['<>'],
    setTextSelection: (anchor: number, head?: number) => setTextSelection(editorView, anchor, head),
    sendKeyToPm: (key: string) => sendKeyToPm(editorView, key),
    insertText: (text: string, from?: number, to?: number) => insertText(editorView, text, from, to),
    insert: (content: BuilderContent[]) => insert(editorView, content)
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
  setTextSelection: (anchor: number, head?: number) => void;
  sendKeyToPm: (key: string) => void;
  insertText: (text: string, from?: number, to?: number) => void;
  insert: (content: BuilderContent[]) => Refs;
}
