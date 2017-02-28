import { Block, Node, Schema, NodeSpec } from '../../prosemirror/future';

export class BlockQuoteNodeType extends Block {
  constructor(name: string, schema: Schema) {
    super(name, schema, blockquote);
    if (name !== 'blockquote') {
      throw new Error('BlockQuoteNodeType must be named "blockquote".');
    }
  }

  get selectable(): boolean {
    return false;
  }

  get matchDOMTag() {
    return {
      blockquote: null
    };
  }

  toDOM(): [string, any] {
    return ['blockquote', 0];
  }
}

export interface BlockQuoteNode extends Node {
  type: BlockQuoteNodeType;
}

export function isBlockQuoteNode(node: Node): node is BlockQuoteNode {
  return node.type instanceof BlockQuoteNodeType;
}

export const blockquote: NodeSpec = {
  content: 'block+',
  group: 'block',
  defining: true,
  parseDOM: [{ tag: 'blockquote' }],
  toDOM() { return ['blockquote', 0]; }
};
