import {
  code as codeBase,
  MarkSpec,
  NodeSpec,
  Schema,
  createSchema
} from '@atlaskit/editor-core';

import jiraIssue from './schema/nodes/jiraIssue';
import unsupportedBlock from './schema/nodes/unsupportedBlock';
import unsupportedInline from './schema/nodes/unsupportedInline';

const code = {
  ...codeBase,
  excludes: 'em strike strong underline'
};

export interface CQSchemaNodes {
  blockquote: NodeSpec;
  bulletList: NodeSpec;
  codeBlock: NodeSpec;
  panel: NodeSpec;
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
  media: NodeSpec;
  mediaGroup: NodeSpec;
}

export interface CQSchemaMarks {
  code: MarkSpec;
  em: MarkSpec;
  link: MarkSpec;
  strike: MarkSpec;
  strong: MarkSpec;
  subsup: MarkSpec;
  underline: MarkSpec;
  mentionQuery: MarkSpec;
}


const nodes = [
  'doc',
  'paragraph',
  'blockquote',
  'codeBlock',
  'panel',
  'hardBreak',
  'orderedList',
  'bulletList',
  'heading',
  'mediaGroup',
  'unsupportedBlock',
  'jiraIssue',
  'listItem',
  'mention',
  'text',
  'unsupportedInline',
  'media',
  'rule'
];

const customNodeSpecs = { jiraIssue, unsupportedBlock, unsupportedInline };

// ranking order is important
// @see https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-Rank
const marks = [
  'link',
  'em',
  'strong',
  'strike',
  'subsup',
  'underline',
  'mentionQuery',
  'code'
];

const customMarkSpecs = { code };

export interface CQSchema extends Schema<CQSchemaNodes, CQSchemaMarks> {}

export default createSchema({ nodes, marks, customNodeSpecs, customMarkSpecs });
