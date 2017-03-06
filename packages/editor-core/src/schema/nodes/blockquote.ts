import { Block, Node, Schema } from '../../prosemirror';

export class BlockQuoteNodeType extends Block {
  constructor(name: string, schema: Schema) {
    super(name, schema);
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
