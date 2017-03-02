import { Schema } from '../src/prosemirror';
import {
  doc,
  paragraph,
  text,
  em,
  strong,
  mono,
  strike,
  underline,
  bulletList,
  orderedList,
  listItem,
  heading,
  blockquote,
  codeBlock,
  horizontalRule,
  hardBreak,
  mention,
  emoji,
  link,
  image
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
  horizontalRule,
  hardBreak,
  mention,
  emoji,
  image
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
