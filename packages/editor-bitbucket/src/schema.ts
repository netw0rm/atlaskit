import {
  Schema,
  doc,
  paragraph,
  text,
  em,
  strong,
  code as coreCode,
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
  emojiQuery,
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

const code = {
  ...coreCode,
  excludes: 'em strike strong mentionQuery emojiQuery'
};

const marks = {
  em,
  strong,
  code,
  strike,
  link,
  mentionQuery,
  emojiQuery
};

export { MarkSpec, NodeSpec };
export default new Schema<typeof nodes, typeof marks>({ nodes, marks });
