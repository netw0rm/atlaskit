import { Schema } from '../../src/prosemirror';
import {
  doc,
  paragraph,
  text,
  em,
  strong,
  code,
  strike,
  link,
  u,
  bulletList,
  orderedList,
  listItem,
  heading,
  blockquote,
  codeBlock,
  panel,
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
  panel,
  rule,
  image,
};

const marks = {
  em,
  strong,
  code,
  strike,
  u,
  link
};

export default new Schema<typeof nodes, typeof marks>({ nodes, marks });
