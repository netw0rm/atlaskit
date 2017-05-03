import { Schema, AttributeSpec, MarkSpec, Node, NodeSpec, ParseRule } from '../prosemirror';
import {
  doc,
  docCompact,
  paragraph,
  text,
  em,
  strong,
  code,
  strike,
  underline,
  bulletList,
  orderedList,
  listItem,
  heading,
  blockquote,
  codeBlock,
  panel,
  rule,
  hardBreak,
  media,
  mediaGroup,
  mention,
  emoji,
  link,
  image,
  mentionQuery,
  subsup,
  emojiQuery,
} from '../schema';

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
  panel,
  rule,
  hardBreak,
  mention,
  emoji,
  image,
  media,
  mediaGroup,
  linkable: { ...paragraph, content: 'text<link>*' },
  unlinkable: { ...paragraph, content: 'text*' },
  plain: { ...paragraph, content: 'text*' }
};

const marks = {
  em,
  strong,
  code,
  strike,
  underline,
  link,
  mentionQuery,
  subsup,
  emojiQuery
};

export { AttributeSpec, MarkSpec, Node, NodeSpec, ParseRule, nodes, marks };
export default new Schema<typeof nodes, typeof marks>({ nodes, marks });

// compact schema for HCNG
const compactSchemaNodes = {
  doc: docCompact,
  paragraph,
  mediaGroup,
  mention,
  text,
  media,
};

const compactSchemaMarks = {
  mentionQuery,
};

export const compactSchema = new Schema<typeof compactSchemaNodes, typeof compactSchemaMarks>({
  nodes: compactSchemaNodes,
  marks: compactSchemaMarks
});
