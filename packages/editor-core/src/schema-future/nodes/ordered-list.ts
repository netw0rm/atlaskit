import { Node as OrderedListNode, OrderedList as OrderedListNodeType, NodeSpec } from '../../prosemirror/future';

export { OrderedListNodeType, OrderedListNode };

export const orderedList: NodeSpec = {
  group: 'block',
  content: 'list_item+',
  parseDOM: [{ tag: 'ol' }],
  toDOM() {
    return ['ol', 0];
  }
};

export function isOrderedListNode(node: OrderedListNode): node is OrderedListNode {
  return node.type.name === 'ordered_list';
}
