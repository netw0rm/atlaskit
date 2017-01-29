import { Node, NodeSpec } from '../../prosemirror/future';

const attrs = {
  order: {
    default: 1
  }
};

// tslint:disable-next-line:variable-name
export const ordered_list: NodeSpec = {
  attrs,
  parseDOM: [
    {
      tag: 'ol',
      getAttrs(dom: HTMLOListElement) {
        return {
          order: dom.hasAttribute('start') ? +dom.getAttribute('start')! : 1
        };
      }
    }
  ],
  toDOM(node: OrderedListNode) {
    return ['ol', { start: node.attrs.order === 1 ? null : node.attrs.order }, 0];
  }
};

interface OrderedListNode extends Node {
  attrs: {
    [P in keyof typeof attrs]: typeof attrs[P]['default'];
  };
}

export function isOrderedListNode(node: Node): node is OrderedListNode {
  return node.type.name === 'ordered_list';
}
