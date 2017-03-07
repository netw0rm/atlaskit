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
  horizontalRule
} from '../../src/schema';

const nodes = {
  doc,
  paragraph,
  text,
  bullet_list: bulletList,
  ordered_list: orderedList,
  list_item: listItem,
  heading,
  blockquote,
  codeBlock,
  horizontalRule
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
