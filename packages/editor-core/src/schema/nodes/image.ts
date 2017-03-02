import { NodeSpec, Node } from '../../prosemirror';

export const image: NodeSpec = {
  group: 'inline',
  inline: true,
  attrs: {
    src: {default: ''}
  },
  draggable: true,
  parseDOM: [{tag: 'img[src]', getAttrs(dom: HTMLElement) {
    return {src: dom.getAttribute('src')};
  }}],
  toDOM(node: Node) { return ['img', node.attrs]; }
};
