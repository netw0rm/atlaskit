import { NodeSpec, Node } from '../../prosemirror';


export const singleImage: NodeSpec = {
  inline: false,
  group: 'block',
  content: 'media',
  attrs: {
    alignment: { default: 'left' },
    display: { default: 'inline-block' }
  },
  parseDOM: [{
    tag: 'div[data-node-type="singleImage"]',
    getAttrs: (dom: HTMLElement) => ({
      'alignment': dom.getAttribute('data-alignment'),
      'display': dom.getAttribute('data-display'),
    })
  }],
  toDOM(node: Node): [string, any, number] {
    const { alignment, display } = node.attrs;
    const attrs = {
      'data-node-type': 'singleImage',
      'data-alignment': alignment,
      'data-display': display,
    };
    return [
      'div',
      attrs,
      0
    ];
  }
};
