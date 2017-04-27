import {
  blockquote,
  bulletList,
  code,
  codeBlock,
  doc,
  em,
  emoji,
  emojiQuery,
  hardBreak,
  heading,
  image,
  link,
  listItem,
  mention,
  mentionQuery,
  orderedList,
  panel,
  paragraph,
  rule,
  strike,
  strong,
  subsup,
  text,
  underline,
  MarkSpec,
  NodeSpec,
  Schema,
} from '../';

import { NodeDesc } from './descriptor';

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
  panel,
};

const marks = {
  em,
  strong,
  code,
  strike,
  link,
  mentionQuery,
  emojiQuery,
  underline,
  subsup,
};

export { MarkSpec, NodeDesc, NodeSpec };
export default new Schema<typeof nodes, typeof marks>({ nodes, marks });
