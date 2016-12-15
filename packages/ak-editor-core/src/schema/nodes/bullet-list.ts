import { BulletList as BulletListNodeType, Node } from 'ak-editor-prosemirror';

export { BulletListNodeType };

export interface BulletListNode extends Node {
  type: BulletListNodeType;
}

export function isBulletListNode(node: Node): node is BulletListNode {
  return node.type instanceof BulletListNodeType;
}
