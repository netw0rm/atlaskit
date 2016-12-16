import { Paragraph as ParagraphNodeType, Node } from '../../prosemirror';

export { ParagraphNodeType };

export interface ParagraphNode extends Node {
  type: ParagraphNodeType;
}

export function isParagraphNode(node: Node): node is ParagraphNode {
  return node.type instanceof ParagraphNodeType;
}
