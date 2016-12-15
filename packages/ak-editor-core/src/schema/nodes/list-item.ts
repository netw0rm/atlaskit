import { ListItem as ListItemNodeType, Node } from '../../prosemirror';

export { ListItemNodeType };

export interface ListItemNode extends Node {
  type: ListItemNodeType;
}

export function isListItemNode(node: Node): node is ListItemNode {
  return node.type instanceof ListItemNodeType;
}
