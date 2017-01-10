import { OrderedList, Node, Schema } from '../../prosemirror';

export class OrderedListNodeType extends OrderedList {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'ordered_list') {
      throw new Error('OrderedListNodeType must be named "ordered_list".');
    }
  }
}

export interface OrderedListNode extends Node {
  type: OrderedListNodeType;
}

export function isOrderedListNode(node: Node): node is OrderedListNode {
  return node.type instanceof OrderedListNodeType;
}
