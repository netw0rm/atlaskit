import { MarkSpec } from '../../prosemirror';

export const subsup: MarkSpec = {
  get inclusiveRight() {
    return true;
  },
  attrs: {
    type: {default: 'sub'}
  },
  parseDOM: [
    {tag: 'span', getAttrs: (dom: Element) => {
      return {type: dom.getAttribute('type')};
    }}
  ],
  toDOM(node) {
    return ['span', node.attrs];
  }
};
