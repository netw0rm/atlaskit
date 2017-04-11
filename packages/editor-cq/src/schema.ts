import {
  bulletList,
  blockquote,
  codeBlock,
  code as codeBase,
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
  panel,
  panelText,
} from '@atlaskit/editor-core';

import jiraIssue from './schema/nodes/jiraIssue';
import unsupportedBlock from './schema/nodes/unsupportedBlock';
import unsupportedInline from './schema/nodes/unsupportedInline';

const code = {
  ...codeBase,
  excludes: 'em strike strong underline'
};

interface CQSchemaNodes {
  blockquote: NodeSpec;
  bulletList: NodeSpec;
  codeBlock: NodeSpec;
  panel: NodeSpec;
  panelText: NodeSpec;
  doc: NodeSpec;
  hardBreak: NodeSpec;
  heading: NodeSpec;
  jiraIssue: NodeSpec;
  listItem: NodeSpec;
  mention: NodeSpec;
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
  link: MarkSpec;
  strike: MarkSpec;
  strong: MarkSpec;
  subsup: MarkSpec;
  underline: MarkSpec;
}

const nodes = {
  doc,
  paragraph,
  blockquote,
  codeBlock,
  panel,
  panelText,
  hardBreak,
  orderedList,
  bulletList,
  heading,
  unsupportedBlock,
  jiraIssue,
  listItem,
  mention,
  text,
  unsupportedInline,
  rule,
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
