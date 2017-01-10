import { ListItem, Node, Schema } from '../../prosemirror';

export class ListItemNodeType extends ListItem {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'list_item') {
      throw new Error('ListItemNodeType must be named "list_item".');
    }
  }
}

export interface ListItemNode extends Node {
  type: ListItemNodeType;
}

export function isListItemNode(node: Node): node is ListItemNode {
  return node.type instanceof ListItemNodeType;
}
