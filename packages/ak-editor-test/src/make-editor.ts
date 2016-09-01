import { Plugin, ProseMirror, schema } from 'ak-editor-prosemirror';
import SyncPlugin from './sync-plugin';
import { RefsNode } from './schema-builder';

/**
 * Build a ProseMirror instance.
 *
 * Initial selection can be indicated using refs:
 *
 * - `<>` -- a collapsed text selection
 * - `<` and `>` -- a range text selection (`<` is from, `>` is to).
 */
export default (options: { doc: RefsNode, plugin: Plugin<any>}) => {
  const pm = new ProseMirror({
    doc: options.doc,
    schema: schema,
    plugins: [
      options.plugin,
      SyncPlugin,
    ]
  });

  // Collapsed selection.
  if ('<>' in pm.doc.refs) {
    pm.setTextSelection(pm.doc.refs['<>']);
  // Expanded selection
  } else if ('<' in pm.doc.refs || '>' in pm.doc.refs) {
    if ('<' in pm.doc.refs === false) throw new Error('A `<` ref must complement a `>` ref.')
    if ('>' in pm.doc.refs === false) throw new Error('A `>` ref must complement a `<` ref.')
    pm.setTextSelection(pm.doc.refs['<'], pm.doc.refs['>'])
  }

  return { pm, plugin: options.plugin.get(pm) };
};
