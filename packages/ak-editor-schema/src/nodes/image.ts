import { Image as ImageNodeType, Node } from 'ak-editor-prosemirror';

export { ImageNodeType };

export interface ImageNode extends Node {
  type: ImageNodeType;
}

export function isImageNode(node: Node): node is ImageNode {
  return node.type instanceof ImageNodeType;
}
