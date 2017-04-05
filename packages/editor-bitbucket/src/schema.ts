import {
  Schema,
  doc,
  paragraph,
  text,
  em,
  strong,
  code,
  strike,
  link,
  bulletList,
  orderedList,
  listItem,
  heading,
  blockquote,
  codeBlock,
  hardBreak,
  rule,
  image,
  emoji,
  mention,
  mentionQuery,
  MarkSpec,
  NodeSpec
} from '@atlaskit/editor-core';

const nodes = {
  doc,
  paragraph,
  text,
  bulletList,
  orderedList,
  listItem,
  heading,
  blockquote,
  codeBlock,
  hardBreak,
  rule,
  image,
  mention,
  emoji,
};

code['excludes'] = 'em strike strong';

const marks = {
  em,
  strong,
  code,
  strike,
  link,
  mentionQuery
};

export { MarkSpec, NodeSpec };
export default new Schema<typeof nodes, typeof marks>({ nodes, marks });
