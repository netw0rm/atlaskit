import { Schema } from '../src/prosemirror';
import {
  doc,
  paragraph,
  text,
  em,
  strong,
  code,
  strike,
  link,
  underline,
  mentionQuery,
  bulletList,
  orderedList,
  listItem,
  heading,
  blockquote,
  codeBlock,
  panel,
  rule,
  image,
  mention,
  hardBreak,
} from '../src/schema';

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
  image,
  mention,
  hardBreak,
};

const marks = {
  em,
  strong,
  code,
  strike,
  underline,
  link,
  mentionQuery,
};

export default new Schema<typeof nodes, typeof marks>({ nodes, marks });
