import { Fragment, Node, Slice, Schema } from 'prosemirror/dist/model';
import { Plugin, ProseMirror } from 'prosemirror/dist/edit';
import * as base64fileconverter from './base64fileconverter';
import makeSchemaBuilder from './schema-builder';
import makeChaiPlugin from './chai';
import makeSyncPlugin from './sync-plugin';
import makeMakeEditor from './make-editor';

export { base64fileconverter };

export interface Context {
  Fragment: typeof Fragment;
  Node: typeof Node;
  Slice: typeof Slice;
  schema: Schema;
  Plugin: typeof Plugin;
}

export default (ctx: Context) => ({
  builder: makeSchemaBuilder(ctx),
  chaiPlugin: makeChaiPlugin(ctx),
  SyncPlugin: makeSyncPlugin(ctx),
  makeEditor: makeMakeEditor(ctx),
});


