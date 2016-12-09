import { nodeFactory, markFactory } from 'ak-editor-test';
import {
  DocNodeType,
  ParagraphNodeType,
  LinkMarkType,
  Text
} from 'ak-editor-schema';
import { Schema } from 'ak-editor-prosemirror';

export const schema = new Schema({
  nodes: {
    doc: { type: DocNodeType, content: 'block+' },
    unlinkable: { type: ParagraphNodeType, content: 'text*', group: 'block' },
    linkable: { type: ParagraphNodeType, content: 'text<link>*', group: 'block' },
    text: { type: Text },
  },

  marks: {
    link: LinkMarkType,
  },
});

export const doc = nodeFactory(schema.nodes.doc);
export const unlinkable = nodeFactory(schema.nodes.unlinkable);
export const linkable = nodeFactory(schema.nodes.linkable);
export const link = (attrs: { href: string }) => markFactory(schema.marks.link, attrs);
