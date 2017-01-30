import { Node, OrderedList as OrderedListNodeType } from '../../prosemirror';
import { NodeSpec } from '../../prosemirror/future';

export { OrderedListNodeType };

export const orderedList: NodeSpec = {
  group: 'block',
  content: 'list_item+',
  parseDOM: [{ tag: 'ol' }],
  toDOM() {
    return ['ol', 0];
  }
};

export interface OrderedListNode extends Node {
  type: OrderedListNodeType;
}

export function isOrderedListNode(node: Node): node is OrderedListNode {
  return node.type instanceof OrderedListNodeType;
}
