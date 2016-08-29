import { Fragment, Node, Slice, Schema } from 'prosemirror/dist/model';
import { ProseMirror } from 'prosemirror/dist/edit';
import * as base64fileconverter from './base64fileconverter';
import makeSchemaBuilder from './schema-builder';
import makeChaiEditor from './chai';

export { base64fileconverter };

export interface Context {
  Slice: typeof Slice;
  Fragment: typeof Fragment;
  Node: typeof Node;
  schema: Schema;
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

    select(pm: ProseMirror, from: number, to?: number) {
      if (typeof to === 'undefined') {
        to = from;
      }
      pm.setTextSelection(from, to);
      api.poke(pm);
    },

    poke(pm: ProseMirror) {
      // Poke inside the trigger all update schedulers. Normally it would be
      // done on a timeout if the editor is in the DOM, but for tests we want to
      // skip that requirement.
      (pm as any).centralScheduler.force();
    },
  };
  return api;
}


