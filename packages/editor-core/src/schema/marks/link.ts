import { MarkSpec } from '../../prosemirror';

export const link: MarkSpec = {
  attrs: {
    href: {},
    title: {default: null}
  },
  get inclusiveRight() {
    return false;
  },
  parseDOM: [
    {tag: 'a[href]', getAttrs: (dom: Element) => {
      return {href: dom.getAttribute('href'), title: dom.getAttribute('title')};
    }}
  ],
  toDOM(node): [string, any] { return ['a', node.attrs]; }
};
