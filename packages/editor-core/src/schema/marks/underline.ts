import { MarkSpec } from '../../prosemirror';
import { FONT_STYLE } from '../groups';

export const underline: MarkSpec = {
  inclusive: true,
  group: FONT_STYLE,
  parseDOM: [
    { tag: 'u' },
    { style: 'text-decoration', getAttrs: value => value === 'underline' && null }
  ],
  toDOM(): [string] { return ['u']; }
};
