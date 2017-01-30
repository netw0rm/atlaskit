import { Block, Node, Schema } from '../../prosemirror';
import { NodeSpec } from '../../prosemirror/future';

export const doc: NodeSpec = {
  content: 'block+'
};

export class DocNodeType extends Block {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'doc') {
      throw new Error('DocNodeType must be named "doc".');
    }
  }

  get matchDOMTag() {
    return {};
  }
}

export interface DocNode extends Node {
  type: DocNodeType;
}

export function isDocNode(node: Node): node is DocNode {
  return node.type instanceof DocNodeType;
}
