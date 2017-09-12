import { MarkSpec } from '../../prosemirror';
import { LINK, COLOR } from '../groups';
import { isSafeUrl } from '../../renderer/utils';
import { normalizeUrl } from '../../plugins/hyperlink/utils';

/**
 * @name link_mark
 */
export interface Definition {
  type: 'link';
  attrs: {
    href: string;
    title?: string;
  };
}

export const link: MarkSpec = {
  excludes: COLOR,
  group: LINK,
  attrs: {
    href: {}
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'a[href]', getAttrs: (dom: Element) => {
        const href = dom.getAttribute('href') || '';

        return isSafeUrl(href)
          ? { href: normalizeUrl(href) }
          : false;
      }
    }
  ],
  toDOM(node): [string, any] { return ['a', node.attrs]; }
};
