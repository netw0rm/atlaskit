import { Heading as HeadingNodeType, Node } from 'ak-editor-prosemirror';

export { HeadingNodeType };

export interface HeadingNode extends Node {
  type: HeadingNodeType;
  attrs: {
    level: number;
  }
}

export function isHeadingNode(node: Node): node is HeadingNode {
  return node.type instanceof HeadingNodeType;
}
