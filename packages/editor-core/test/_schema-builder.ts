import { Schema } from '../src/prosemirror';
import {
  doc,
  paragraph,
  text,
  em,
  strong,
  code,
  strike,
  u,
  bulletList,
  orderedList,
  listItem,
  heading,
  blockquote,
  codeBlock,
  rule
} from '../src/schema';

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
  u
};

export const schema = new Schema<typeof nodes, typeof marks>({ nodes, marks });
