import { Fragment, Node, Slice, Schema } from 'prosemirror/dist/model';
import { Plugin, ProseMirror } from 'prosemirror/dist/edit';
import * as base64fileconverter from './base64fileconverter';
import makeSchemaBuilder from './schema-builder';
import makeChaiEditor from './chai';
import makeSyncPlugin from './sync-plugin';

export { base64fileconverter };

export interface Context {
  Fragment: typeof Fragment;
  Node: typeof Node;
  Slice: typeof Slice;
  schema: Schema;
  Plugin: typeof Plugin;
}

export default (context: Context) => {
  const api = {
    builder: makeSchemaBuilder(context),

    chaiEditor: makeChaiEditor(context),

    insertText(pm: ProseMirror, text: string) {
      pm.input.insertText(pm.selection.from, pm.selection.to, text);
    },

    insert(pm: ProseMirror, ...content: (string | Node | Node[])[]) {
      const { from, to } = pm.selection;
      pm.tr.replaceWith(from, to, api.builder.fragment(...content)).apply();
    },

    SyncPlugin: makeSyncPlugin(context),
  };
  return api;
}


