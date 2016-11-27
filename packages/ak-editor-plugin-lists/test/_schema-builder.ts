import { nodeFactory } from 'ak-editor-test';
import {
  BulletListNodeType,
  DocNodeType,
  HeadingNodeType,
  ListItemNodeType,
  OrderedListNodeType,
  ParagraphNodeType,
  Text
} from 'ak-editor-schema';
import { Schema } from 'ak-editor-prosemirror';

export const schema = new Schema({
  nodes: {
    doc: { type: DocNodeType, content: 'block+' },
    bullet_list: { type: BulletListNodeType, content: 'list_item+', group: 'block' },
    heading: { type: HeadingNodeType, content: 'text<_>*', group: 'block' },
    list_item: { type: ListItemNodeType, content: 'paragraph+' },
    ordered_list: { type: OrderedListNodeType, content: 'list_item+', group: 'block' },
    paragraph: { type: ParagraphNodeType, content: 'text*', group: 'block' },
    text: { type: Text },
  }
});

export const doc = nodeFactory(schema.nodes.doc);
export const h1 = nodeFactory(schema.nodes.heading, { level: 1 });
export const li = nodeFactory(schema.nodes.list_item);
export const ol = nodeFactory(schema.nodes.ordered_list);
export const p = nodeFactory(schema.nodes.paragraph);
export const ul = nodeFactory(schema.nodes.bullet_list);
