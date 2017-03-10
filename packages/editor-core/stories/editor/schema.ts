import { Schema } from '../../src/prosemirror';
import {
  doc,
  paragraph,
  text,
  em,
  strong,
  mono,
  strike,
  link,
  underline,
  bulletList,
  orderedList,
  listItem,
  heading,
  blockquote,
  codeBlock,
  rule,
  image,
} from '../../src/schema';

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
  image,
};

const marks = {
  em,
  strong,
  mono,
  strike,
  underline,
  link
};

export default new Schema<typeof nodes, typeof marks>({ nodes, marks });
