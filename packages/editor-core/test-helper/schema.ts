import { Schema } from '../src/prosemirror';
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
  rule,
  hardBreak,
  mention,
  emoji,
  link,
  image,
  mentionQuery
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
  rule,
  hardBreak,
  mention,
  emoji,
  image,
  linkable: {...paragraph, content: 'text<link>*'},
  unlinkable: {...paragraph, content: 'text*'}
};

const marks = {
  em,
  strong,
  code,
  strike,
  underline,
  link,
  mentionQuery
};

export default new Schema<typeof nodes, typeof marks>({ nodes, marks });
