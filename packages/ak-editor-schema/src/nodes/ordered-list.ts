import { OrderedList as OrderedListNodeType, Node } from 'ak-editor-prosemirror';

export { OrderedListNodeType };

export interface OrderedListNode extends Node {
  type: OrderedListNodeType;
}

export function isOrderedListNode(node: Node): node is OrderedListNode {
  return node.type instanceof OrderedListNodeType;
}
