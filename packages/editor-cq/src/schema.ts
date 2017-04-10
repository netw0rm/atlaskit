import {
  bulletList,
  blockquote,
  codeBlock,
  code,
  doc,
  em,
  hardBreak,
  heading,
  link,
  listItem,
  mention,
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
  media,
  mediaGroup
} from '@atlaskit/editor-core';

import unsupportedBlock from './schema/nodes/unsupportedBlock';
import unsupportedInline from './schema/nodes/unsupportedInline';

interface CQSchemaNodes {
  blockquote: NodeSpec;
  bulletList: NodeSpec;
  codeBlock: NodeSpec;
  doc: NodeSpec;
  hardBreak: NodeSpec;
  heading: NodeSpec;
  listItem: NodeSpec;
  mention: NodeSpec;
  orderedList: NodeSpec;
  paragraph: NodeSpec;
  rule: NodeSpec;
  text: NodeSpec;
  unsupportedBlock: NodeSpec;
  unsupportedInline: NodeSpec;
  media: NodeSpec;
  mediaGroup: NodeSpec;
}


interface CQSchemaMarks {
  code: MarkSpec;
  em: MarkSpec;
  link: MarkSpec;
  strike: MarkSpec;
  strong: MarkSpec;
  subsup: MarkSpec;
  underline: MarkSpec;
}


const nodes = {
  blockquote,
  bulletList,
  codeBlock,
  doc,
  hardBreak,
  heading,
  mediaGroup,
  listItem,
  mention,
  orderedList,
  paragraph,
  rule,
  text,
  unsupportedBlock,
  unsupportedInline,
  media,
};

const marks = {
  code,
  em,
  link,
  strike,
  strong,
  subsup,
  underline,
};

export interface CQSchema extends Schema<CQSchemaNodes, CQSchemaMarks> {}

export default new Schema<typeof nodes, typeof marks>({ nodes, marks }) as CQSchema;
