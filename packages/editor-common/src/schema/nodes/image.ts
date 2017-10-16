import { NodeSpec, Node } from 'prosemirror-model';

export const image: NodeSpec = {
  group: 'inline',
  inline: true,
  attrs: {
    src: { default: '' },
    alt: { default: null },
    title: { default: null }
  },
  draggable: true,
  parseDOM: [{
    tag: 'img[src]', getAttrs(dom: HTMLElement) {
      return {
        src: dom.getAttribute('src') || '',
        alt: dom.getAttribute('alt') || null,
        title: dom.getAttribute('title') || null
      };
    }
  }],
  toDOM(node: Node) { return ['img', node.attrs]; }
};
