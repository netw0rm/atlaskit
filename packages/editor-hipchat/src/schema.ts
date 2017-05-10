import {
  docCompact,
  MarkSpec,
  NodeSpec,
  Schema,
  createSchema
} from '@atlaskit/editor-core';

export interface HCSchemaNodes {
  doc: NodeSpec;
  paragraph: NodeSpec;
  text: NodeSpec;
  hardBreak: NodeSpec;
  media: NodeSpec;
  mediaGroup: NodeSpec;
  mention: NodeSpec;
  emoji: NodeSpec;
}

export interface HCSchemaMarks {
  link: MarkSpec;
  em: MarkSpec;
  strong: MarkSpec;
  underline: MarkSpec;
  mentionQuery: MarkSpec;
  emojiQuery: MarkSpec;
}
  // // The top level node for a document.
  // doc: docCompact,

const nodes = [

  // A paragraph node.
  'paragraph',

  // Text node.
  'text',

  // The equivalent of a <br> in HTML.
  //
  // This mark is used internally and is translated to a text node with content "\n" in documents
  // exposed from getter APIs.
  'hardBreak',

  // An @-mention.
  'mention',

  // An emoji.
  'emoji',

  // media
  'mediaGroup',
  'media',
];

const customNodeSpecs = {
  // The top level node for a document.
  doc: docCompact
};

const marks = [
  // Represents a hyperlink to a URL.
  'link',

  // Represents an italic text
  'em',

  // Represents bolded text
  'strong',

  // Represents underlined text
  'underline',

  // Represents a "mention query". A mention query is created by typing the @ symbol. The text
  // within a mention query is used to search for a mention.
  //
  // This mark is used internally, and is stripped from documents before they are exposed through
  // the editor getter APIs.
  'mentionQuery',

  // Represents an "emoji query". An emoji query is created by typing the : symbol. The text
  // within an emoji query is used to search for an emoji.
  //
  // This mark is used internally, and is stripped from documents before they are exposed through
  // the editor getter APIs.
  'emojiQuery'
];

export interface HCSchema extends Schema<HCSchemaNodes, HCSchemaMarks> {}

export default createSchema({ nodes, marks, customNodeSpecs }) as HCSchema;
