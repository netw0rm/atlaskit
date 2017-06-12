import { MarkSpec } from '../../prosemirror';
import { LINK } from '../groups';

export const link: MarkSpec = {
  excludes: 'textColor',
  group: LINK,
  attrs: {
    href: {}
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'a[href]', getAttrs: (dom: Element) => {
        return { href: dom.getAttribute('href') };
      }
    }
  ],
  toDOM(node): [string, any] { return ['a', node.attrs]; }
};
