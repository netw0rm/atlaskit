import { Schema } from '../prosemirror';
import {
  doc,
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
  mention,
  emoji,
  link,
  image,
  mentionQuery,
  subsup
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
  subsup
};

export default new Schema<typeof nodes, typeof marks>({ nodes, marks });
