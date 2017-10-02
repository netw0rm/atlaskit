import { MarkSpec } from '../../prosemirror';
import { LINK, COLOR } from '../groups';

/**
 * @name action_mark
 */
export interface Definition {
  type: 'action';
  attrs: {
    target: string;
  };
}

export const action: MarkSpec = {
  excludes: COLOR,
  group: LINK,
  attrs: {
    target: {}
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'span[data-target]', getAttrs: (dom: Element) => {
        const target = dom.getAttribute('data-target') || '';

        return target
          ? { target }
          : false;
      }
    }
  ],
  toDOM(node): [string, any] { return ['span', {
    'data-target': node.attrs.target
  }]; }
};
