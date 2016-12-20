import {
  DocNodeType,
  HardBreakNodeType,
  ParagraphNodeType,
  Schema,
  Text
} from 'ak-editor-core';

export default new Schema({
  nodes: {
    doc: { type: DocNodeType, content: 'paragraph' },
    paragraph: { type: ParagraphNodeType, content: 'inline*' },
    text: { type: Text, group: 'inline' },
    hard_break: { type: HardBreakNodeType, group: 'inline' },
  },
  marks: {},
}) as HipChatSchema;

export interface HipChatSchema extends Schema {
  nodes: {
    doc: DocNodeType;
    paragraph: ParagraphNodeType;
    text: Text;
    hard_break: HardBreakNodeType;
  }
  marks: {}
}
