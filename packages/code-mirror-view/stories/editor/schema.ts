import {
  MarkSpec,
  NodeSpec,
  Schema,
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
  'panel',
  'rule',
  'image',
  'mention',
  'emoji'
];

const marks = [
  'em',
  'strong',
  'strike',
  'link',
  'mentionQuery',
  'emojiQuery',
  'code',
];

export { MarkSpec, NodeSpec, Schema };
export default createSchema({ nodes, marks });
