import { Schema } from '../../src/prosemirror';
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
  rule
} from '../../src/schema';

const nodes = {
  doc,
  paragraph,
  text,
  bulletList: bulletList,
  orderedList: orderedList,
  listItem: listItem,
  heading,
  blockquote,
  codeBlock,
  rule
};

const marks = {
  em,
  strong,
  code,
  strike,
  underline
};

export const schema = new Schema<typeof nodes, typeof marks>({ nodes, marks });
