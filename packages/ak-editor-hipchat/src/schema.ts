import {
  DocNodeType,
  HardBreakNodeType,
  ParagraphNodeType,
  Schema,
  Text,
  MentionQueryMarkType,
  MentionNodeType,
  LinkMarkType,
} from 'ak-editor-core';

export default new Schema({
  nodes: {
    doc: { type: DocNodeType, content: 'paragraph' },
    paragraph: { type: ParagraphNodeType, content: 'inline<_>*' },
    text: { type: Text, group: 'inline' },
    hard_break: { type: HardBreakNodeType, group: 'inline' },
    mention: { type: MentionNodeType, group: 'inline' }
  },
  marks: {
    link: LinkMarkType,
    mention_query: MentionQueryMarkType
  },
}) as HipChatSchema;

export interface HipChatSchema extends Schema {
  nodes: {
    doc: DocNodeType;
    paragraph: ParagraphNodeType;
    text: Text;
    hard_break: HardBreakNodeType;
    mention: MentionNodeType;
  };
  marks: {
    link: LinkMarkType;
    mention_query: MentionQueryMarkType;
  };
}
