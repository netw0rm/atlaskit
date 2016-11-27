import { Block, Node, Schema } from 'ak-editor-prosemirror';

export class BlockQuoteNodeType extends Block {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'blockquote') {
      throw new Error("BlockQuoteNodeType must be named 'blockquote'.");
    }
  }

  get matchDOMTag() {
    return {
      blockquote: null
    };
  }

  toDOM() {
    return ['blockquote', 0];
  }
}

export interface BlockQuoteNode extends Node {
  type: BlockQuoteNodeType;
}

export function isBlockQuoteNode(node: Node): node is BlockQuoteNode {
  return node.type instanceof BlockQuoteNodeType;
}
