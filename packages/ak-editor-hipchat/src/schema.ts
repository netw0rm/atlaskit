import {
  DocNodeType,
  EmojiNodeType,
  EmojiQueryMarkType,
  HardBreakNodeType,
  LinkMarkType,
  MentionNodeType,
  MentionQueryMarkType,
  ParagraphNodeType,
  Schema,
  Text,
} from 'ak-editor-core';

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
    mention: { type: MentionNodeType, group: 'inline' },

    // An emoji.
    emoji: { type: EmojiNodeType, group: 'inline' }
  },
  marks: {
    // Represents a hyperlink to a URL.
    link: LinkMarkType,

    // Represents a "mention query". A mention query is created by typing the @ symbol. The text
    // within a mention query is used to search for a mention.
    //
    // This mark is used internally, and is stripped from documents before they are exposed through
    // the editor getter APIs.
    mention_query: MentionQueryMarkType,

    // Represents an "emoji query". An emoji query is created by typing the : symbol. The text
    // within an emoji query is used to search for an emoji.
    //
    // This mark is used internally, and is stripped from documents before they are exposed through
    // the editor getter APIs.
    emoji_query: EmojiQueryMarkType
  },
}) as HipChatSchema;

export interface HipChatSchema extends Schema {
  nodes: {
    doc: DocNodeType;
    paragraph: ParagraphNodeType;
    text: Text;
    hard_break: HardBreakNodeType;
    mention: MentionNodeType;
    emoji: EmojiNodeType;
  };
  marks: {
    link: LinkMarkType;
    mention_query: MentionQueryMarkType;
    emoji_query: EmojiQueryMarkType;
  };
}
