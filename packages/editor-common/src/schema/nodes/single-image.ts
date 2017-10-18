import { NodeSpec, Node } from 'prosemirror-model';

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
      'alignment': dom.getAttribute('data-alignment') || singleImage.attrs!.alignment.default,
      'display': dom.getAttribute('data-display') || singleImage.attrs!.display.default
    })
  }],
  toDOM(node: Node) {
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
