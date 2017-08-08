
import { NodeSpec, Node } from '../../prosemirror';
export type Alighment = 'left' | 'right';

export const singleImage: NodeSpec = {
  inline: false,
  group: 'block',
  content: 'media',
  attrs: {
    alignment: { default: 'left' }
  },
  parseDOM: [{
    tag: 'div[data-node-type="singleImage"]',
    getAttrs: (dom: HTMLElement) => ({
      'alignment': dom.getAttribute('data-alignment')!
    })
  }],
  toDOM(node: Node): [string, any, number] {
    const alignment = node.attrs['alignment'];
    const attrs = {
      'data-node-type': 'singleImage',
      'data-alignment': alignment,
    };
    return [
      'div',
      attrs,
      0
    ];
  }
};
