
import { Schema } from '../../src/prosemirror/future';
import { em } from '../../src/schema/marks/em';
import { mono } from '../../src/schema/marks/mono';
import { strike } from '../../src/schema/marks/strike';
import { strong } from '../../src/schema/marks/strong';
import { underline } from '../../src/schema/marks/underline';
import { blockquote } from '../../src/schema/nodes/blockquote';
import { bulletList } from '../../src/schema/nodes/bullet-list';
import { codeBlock } from '../../src/schema/nodes/code-block';
import { doc } from '../../src/schema/nodes/doc';
import { heading } from '../../src/schema/nodes/heading';
import { horizontalRule } from '../../src/schema/nodes/horizontal-rule';
import { listItem } from '../../src/schema/nodes/list-item';
import { orderedList } from '../../src/schema/nodes/ordered-list';
import { paragraph } from '../../src/schema/nodes/paragraph';
import { text } from '../../src/schema/nodes/text';

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
  underline
};

export default new Schema<typeof nodes, typeof marks>({ nodes, marks });
