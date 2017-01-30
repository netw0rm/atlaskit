import { BulletList as BulletListNodeType, Node as BulletListNode } from '../../prosemirror';
import { NodeSpec } from '../../prosemirror/future';

export { BulletListNodeType, BulletListNode };

export const bulletList: NodeSpec = {
  group: 'block',
  content: 'list_item+',
  parseDOM: [{ tag: 'ul' }],
  toDOM() {
    return ['ul', 0];
  }
};

export function isBulletListNode(node: BulletListNode): node is BulletListNode {
  return node.type.name === 'bullet_list';
}
