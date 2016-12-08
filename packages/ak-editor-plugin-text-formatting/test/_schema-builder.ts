import { nodeFactory, markFactory } from 'ak-editor-test';
import {
  DocNodeType,
  EmMarkType,
  MonoMarkType,
  ParagraphNodeType,
  StrikeMarkType,
  StrongMarkType,
  SubSupMarkType,
  Text,
  UnderlineMarkType
} from 'ak-editor-schema';
import { Schema } from 'ak-editor-prosemirror';

export const schema = new Schema({
  nodes: {
    doc: { type: DocNodeType, content: 'paragraph+' },
    paragraph: { type: ParagraphNodeType, content: 'text<_>*' },
    plain: { type: ParagraphNodeType, content: 'text' },
    text: { type: Text },
  },

  marks: {
    em: EmMarkType,
    mono: MonoMarkType,
    strike: StrikeMarkType,
    strong: StrongMarkType,
    subsup: SubSupMarkType,
    u: UnderlineMarkType,
  },
});

export const doc = nodeFactory(schema.nodes.doc);
export const p = nodeFactory(schema.nodes.paragraph);
export const plain = nodeFactory(schema.nodes.plain);
export const em = markFactory(schema.marks.em);
export const mono = markFactory(schema.marks.mono);
export const strike = markFactory(schema.marks.strike);
export const strong = markFactory(schema.marks.strong);
export const sub = markFactory(schema.marks.subsup, { type: 'sub' });
export const sup = markFactory(schema.marks.subsup, { type: 'sup' });
export const u = markFactory(schema.marks.u);
