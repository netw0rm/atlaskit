import { Attribute, Inline, Node, Schema } from 'ak-editor-prosemirror';

export class ImageNodeType extends Inline {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'image') {
      throw new Error("ImageNodeType must be named 'image'.");
    }
  }

  get attrs() {
    return {
      src: new Attribute(),
    };
  }

  get draggable() {
    return true;
  }

  get matchDOMTag() {
    return {
      'img[src]': (elem: HTMLElement) => ({
        src: elem.getAttribute('src')
      })
    };
  }

  toDOM(node: Node) {
    return ['img', node.attrs];
  }
}

export interface ImageNode extends Node {
  type: ImageNodeType;
}

export function isImageNode(node: Node): node is ImageNode {
  return node.type instanceof ImageNodeType;
}
