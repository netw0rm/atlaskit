import { MarkSpec } from '../../prosemirror';

export const link: MarkSpec = {
  attrs: {
    href: {}
  },
  get inclusiveRight() {
    return false;
  },
  parseDOM: [
    {tag: 'a[href]', getAttrs: (dom: Element) => {
      return {href: dom.getAttribute('href')};
    }}
  ],
  toDOM(node): [string, any] { return ['a', node.attrs]; }
};
