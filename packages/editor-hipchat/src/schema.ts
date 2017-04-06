import {
  em,
  doc,
  hardBreak,
  link,
  MarkSpec,
  mention,
  mentionQuery,
  NodeSpec,
  paragraph,
  Schema,
  strong,
  text,
  underline
} from '@atlaskit/editor-core';

export interface HCSchemaNodes {
  doc: NodeSpec;
  paragraph: NodeSpec;
  text: NodeSpec;
  hardBreak: NodeSpec;
  mention: NodeSpec;
}

export interface HCSchemaMarks {
  link: MarkSpec;
  em: MarkSpec;
  strong: MarkSpec;
  underline: MarkSpec;
  mentionQuery;
}

const nodes: HCSchemaNodes = {
  // The top level node for a document.
  doc,

  // A paragraph node.
  paragraph,

  // Text node.
  text,

  // The equivalent of a <br> in HTML.
  //
  // This mark is used internally and is translated to a text node with content "\n" in documents
  // exposed from getter APIs.
  hardBreak,

  // An @-mention.
  mention
};

const marks: HCSchemaMarks = {
  // Represents a hyperlink to a URL.
  link,

  // Represents an italic text
  em,

  // Represents bolded text
  strong,

  // Represents underlined text
  underline,

  // Represents a "mention query". A mention query is created by typing the @ symbol. The text
  // within a mention query is used to search for a mention.
  //
  // This mark is used internally, and is stripped from documents before they are exposed through
  // the editor getter APIs.
  mentionQuery
};

export interface HCSchema extends Schema<HCSchemaNodes, HCSchemaMarks> {}

export default new Schema<typeof nodes, typeof marks>({ nodes, marks }) as HCSchema;
