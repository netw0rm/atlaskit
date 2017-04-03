import {
  bulletList,
  blockquote,
  code,
  doc,
  em,
  hardBreak,
  heading,
  listItem,
  MarkSpec,
  NodeSpec,
  orderedList,
  paragraph,
  rule,
  Schema,
  strike,
  strong,
  subsup,
  text,
  underline,
} from '@atlaskit/editor-core';

// import { UnsupportedInlineNodeType } from './schema/nodes/unsupportedInline';
// import { UnsupportedBlockNodeType } from './schema/nodes/unsupportedBlock';

interface CQSchemaNodes {
  blockquote: NodeSpec;
  bulletList: NodeSpec;
  doc: NodeSpec;
  hardBreak: NodeSpec;
  heading: NodeSpec;
  listItem: NodeSpec;
  orderedList: NodeSpec;
  paragraph: NodeSpec;
  rule: NodeSpec;
  text: NodeSpec;
  unsupportedBlock: NodeSpec;
  unsupportedInline: NodeSpec;
}

interface CQSchemaMarks {
  code: MarkSpec;
  em: MarkSpec;
  strike: MarkSpec;
  strong: MarkSpec;
  subsup: MarkSpec;
  underline: MarkSpec;
}

const nodes = {
  blockquote,
  bulletList,
  doc,
  hardBreak,
  heading,
  listItem,
  orderedList,
  paragraph,
  rule,
  text,
  // unsupportedBlock,
  // unsupportedInline,
};

const marks = {
  code,
  em,
  strike,
  strong,
  subsup,
  underline,
};

export interface CQSchema extends Schema<CQSchemaNodes, CQSchemaMarks> {}

export default new Schema<typeof nodes, typeof marks>({ nodes, marks }) as CQSchema;
