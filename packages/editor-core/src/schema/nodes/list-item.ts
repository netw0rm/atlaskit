import { ListItem as ListItemNodeType, Node } from '../../prosemirror';
import { NodeSpec } from '../../prosemirror/future';

export { ListItemNodeType };

export const listItem: NodeSpec = {
  content: 'paragraph block*',
  parseDOM: [{ tag: 'li' }],
  toDOM() {
    return ['li', 0];
  }
};

export interface ListItemNode extends Node {
  type: ListItemNodeType;
}

export function isListItemNode(node: Node): node is ListItemNode {
  return node.type instanceof ListItemNodeType;
}
