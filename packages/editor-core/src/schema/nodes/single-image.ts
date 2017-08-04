
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
      'style': `display: inline-block; float: ${alignment}; ${alignment === 'left'? 'padding-right:' : 'padding-left:'} 24px; padding-bottom: 24px`
    };
    return [
      'div',
      attrs,
      0
    ];
  }
};
