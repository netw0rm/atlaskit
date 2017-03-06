import {
  DocNodeType,
  HardBreakNodeType,
  LinkMarkType,
  MentionNodeType,
  MentionQueryMarkType,
  ParagraphNodeType,
  Schema,
  Text,
} from '@atlaskit/editor-core';

export default new Schema({
  nodes: {
    // The top level node for a document.
    doc: { type: DocNodeType, content: 'paragraph' },

    // A paragraph node.
    paragraph: { type: ParagraphNodeType, content: 'inline<_>*' },

    // Text node.
    text: { type: Text, group: 'inline' },

    // The equivalent of a <br> in HTML.
    //
    // This mark is used internally and is translated to a text node with content "\n" in documents
    // exposed from getter APIs.
    hard_break: { type: HardBreakNodeType, group: 'inline' },

    // An @-mention.
    mention: { type: MentionNodeType, group: 'inline' }
  },
  marks: {
    // Represents a hyperlink to a URL.
    link: LinkMarkType,

    // Represents a "mention query". A mention query is created by typing the @ symbol. The text
    // within a mention query is used to search for a mention.
    //
    // This mark is used internally, and is stripped from documents before they are exposed through
    // the editor getter APIs.
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
