import { Plugin, ProseMirror, Schema } from '../';
import { schema } from './schema';
import { RefsNode } from './schema-builder';
import SyncPlugin from './sync-plugin';

export interface Options {
  doc: RefsNode;
  plugin?: Plugin<any>;
  plugins?: Plugin<any>[];
  place?: HTMLElement;
  schema?: Schema;
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
  let plugins: Plugin<any>[] = [];
  if (options.plugin) {
    plugins.push(options.plugin);
  }
  if (options.plugins) {
    plugins.push(...options.plugins);
  }
  plugins.push(SyncPlugin);
  const pm = new ProseMirror({
    doc: options.doc,
    place: options.place,
    schema: options.schema || schema,
    plugins,
  }) as ProseMirrorWithRefs;

  const { refs } = pm.doc;

  // Collapsed selection.
  if ('<>' in refs) {
    pm.setTextSelection(refs['<>']);
  // Expanded selection
  } else if ('<' in refs || '>' in refs) {
    if ('<' in refs === false) {
      throw new Error('A `<` ref must complement a `>` ref.');
    }
    if ('>' in refs === false) {
      throw new Error('A `>` ref must complement a `<` ref.');
    }
    pm.setTextSelection(refs['<'], refs['>']);
  }

  return { pm, plugin: plugins[0].get(pm), plugins: plugins.map(plugin => plugin.get(pm)) };
};

export interface ProseMirrorWithRefs extends ProseMirror {
  doc: RefsNode;
}
