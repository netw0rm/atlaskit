import { Node, Paragraph as ParagraphNodeType, NodeSpec } from '../../prosemirror/future';
export { ParagraphNodeType };

export const paragraph: NodeSpec = {
  content: 'inline<_>*',
  group: 'block',
  parseDOM: [{ tag: 'p' }],
  toDOM() {
    return ['p', 0];
  }
};

export interface ParagraphNode extends Node {
  type: ParagraphNodeType;
}

export function isParagraphNode(node: Node): node is ParagraphNode {
  return node.type instanceof ParagraphNodeType;
}
