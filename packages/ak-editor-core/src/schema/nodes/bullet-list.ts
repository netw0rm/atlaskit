import { Node, NodeSpec } from '../../prosemirror/future';

// tslint:disable-next-line:variable-name
export const bullet_list: NodeSpec = {
  parseDOM: [
    {
      tag: 'ul'
    }
  ],
  toDOM() {
    return ['ul', 0];
  }
};

export interface BulletListNode extends Node {
  attrs: {};
}

export function isBulletListNode(node: Node): node is BulletListNode {
  return node.type.name === 'bullet_list';
  // TODO: I would rather be able to do this (perhaps it works)
  // return node.type.spec === bullet_list;
}
