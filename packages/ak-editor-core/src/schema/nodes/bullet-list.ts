import { BulletList, Node, Schema } from '../../prosemirror';

export class BulletListNodeType extends BulletList {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'bullet_list') {
      throw new Error('BulletListNodeType must be named "bullet_list".');
    }
  }
}

export interface BulletListNode extends Node {
  type: BulletListNodeType;
}

export function isBulletListNode(node: Node): node is BulletListNode {
  return node.type instanceof BulletListNodeType;
}
