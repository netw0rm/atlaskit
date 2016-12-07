import { Plugin, ProseMirror, Schema } from 'ak-editor-prosemirror';
import SyncPlugin from './sync-plugin';
import { RefsNode } from './schema-builder';
import schema from './schema';

interface Options {
  doc: RefsNode;
  plugin: Plugin<any>;
  place?: HTMLElement;
  schema?: Schema
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
  const pm = new ProseMirror({
    doc: options.doc,
    place: options.place,
    schema: options.schema || schema,
    plugins: [
      options.plugin,
      SyncPlugin,
    ]
  }) as ProseMirrorWithRefs;

  const { refs } = pm.doc;

  // Collapsed selection.
  if ('<>' in refs) {
    pm.setTextSelection(refs['<>']);
  // Expanded selection
  } else if ('<' in refs || '>' in refs) {
    if ('<' in refs === false) throw new Error('A `<` ref must complement a `>` ref.')
    if ('>' in refs === false) throw new Error('A `>` ref must complement a `<` ref.')
    pm.setTextSelection(refs['<'], refs['>'])
  }

  return { pm, plugin: options.plugin.get(pm) };
};

interface ProseMirrorWithRefs extends ProseMirror {
  doc: RefsNode;
}
