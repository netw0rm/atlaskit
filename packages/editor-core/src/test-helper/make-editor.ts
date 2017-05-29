import {
  Plugin,
  Schema,
  EditorState,
  EditorView,
  baseKeymap,
  keymap
} from '../prosemirror';
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
export default (options: Options): EditorInstance => {
  const plugins: Plugin[] = [];

  if (options.plugin) {
    plugins.push(options.plugin);
  }

  if (options.plugins) {
    plugins.push(...options.plugins);
  }

  if (options.addBaseKeymap !== false) {
    plugins.push(
      keymap(baseKeymap)
    );
  }

  const editorState = EditorState.create({
    plugins,
    doc: options.doc,
    schema: options.schema || defaultSchema,
  }) as ProseMirrorWithRefs;

  const editorView = new EditorView(options.place || document.body, {
    state: editorState,
    nodeViews: options.nodeViews || {},
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

  const pluginStates = plugins.map((plugin) => plugin.getState(editorState));

  return {
    editorView,
    plugins,
    pluginStates: pluginStates,
    refs,
    plugin: plugins[0],
    pluginState: plugins[0].getState(editorState),
    sel: refs['<>']
  };
};

export interface ProseMirrorWithRefs extends EditorState<Schema<any, any>> {
  doc: RefsNode;
}

export interface Options {
  doc: RefsNode;
  plugin?: Plugin;
  plugins?: Plugin[];
  nodeViews?: { [key: string]: any };
  place?: HTMLElement;
  schema?: Schema<any, any>;
  addBaseKeymap?: boolean;
}

export interface EditorInstance {
  editorView: EditorView;
  pluginState: any;
  pluginStates: any[];
  plugin: Plugin;
  plugins: Plugin[];
  refs: Refs;
  sel: number;
}
