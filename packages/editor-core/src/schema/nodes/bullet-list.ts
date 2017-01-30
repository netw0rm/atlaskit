import { BulletList as BulletListNodeType, Node } from '../../prosemirror';
import { NodeSpec } from '../../prosemirror/future';

export { BulletListNodeType };

export const bulletList: NodeSpec = {
  group: 'block',
  content: 'list_item+',
  parseDOM: [{ tag: 'ul' }],
  toDOM() {
    return ['ul', 0];
  }
};

export interface BulletListNode extends Node {
  type: BulletListNodeType;
}

export function isBulletListNode(node: Node): node is BulletListNode {
  return node.type instanceof BulletListNodeType;
}
