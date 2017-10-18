import { NodeSpec, Node } from '../../prosemirror';

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
        src: dom.getAttribute('src') || image.attrs!.src.default,
        alt: dom.getAttribute('alt') || image.attrs!.alt.default,
        title: dom.getAttribute('title') || image.attrs!.title.default
      };
    }
  }],
  toDOM(node: Node) { return ['img', node.attrs]; }
};
