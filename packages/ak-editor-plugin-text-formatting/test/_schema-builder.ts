import { nodeFactory, markFactory } from 'ak-editor-test';
import {
  DocNodeType,
  ParagraphNodeType,
  StrongMarkType,
  EmMarkType,
  UnderlineMarkType,
  Text
} from 'ak-editor-schema';
import { Schema } from 'ak-editor-prosemirror';

export const schema = new Schema({
  nodes: {
    doc: { type: DocNodeType, content: 'paragraph+' },
    paragraph: { type: ParagraphNodeType, content: 'text<_>*' },
    text: { type: Text },
  },

  marks: {
    strong: StrongMarkType,
    em: EmMarkType,
    u: UnderlineMarkType,
  },
});

export const doc = nodeFactory(schema.nodes.doc);
export const p = nodeFactory(schema.nodes.paragraph);
export const em = markFactory(schema.marks.em);
export const strong = markFactory(schema.marks.strong);
export const u = markFactory(schema.marks.u);
