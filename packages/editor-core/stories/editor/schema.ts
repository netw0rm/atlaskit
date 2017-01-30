import { Schema } from '../../src/prosemirror/future';
import { bulletList } from '../../src/schema/nodes/bullet-list';
import { doc } from '../../src/schema/nodes/doc';
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
  list_item: listItem
};
const marks = {};

export default new Schema<typeof nodes, typeof marks>({ nodes, marks });
