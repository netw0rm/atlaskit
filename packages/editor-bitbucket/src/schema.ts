import {
  code as coreCode,
  MarkSpec,
  NodeSpec,
  createSchema
} from '@atlaskit/editor-core';

const nodes = [
  'doc',
  'paragraph',
  'text',
  'bulletList',
  'orderedList',
  'listItem',
  'heading',
  'blockquote',
  'codeBlock',
  'hardBreak',
  'rule',
  'image',
  'mention',
  'emoji'
];

const code = {
  ...coreCode,
  excludes: 'em strike strong mentionQuery emojiQuery'
} as MarkSpec;

const marks = [
  'em',
  'strong',
  'strike',
  'link',
  'mentionQuery',
  'emojiQuery'
];

const customMarkSpecs = { code };

export { MarkSpec, NodeSpec };
export default createSchema({ nodes, marks, customMarkSpecs});
