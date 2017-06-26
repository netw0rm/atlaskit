import { MarkSpec } from '../../prosemirror';
import { FONT_STYLE } from '../groups';

export const strike: MarkSpec = {
  inclusive: true,
  group: FONT_STYLE,
  parseDOM: [
    { tag: 'strike' },
    { tag: 's' },
    { style: 'text-decoration', getAttrs: value => value === 'line-through' && null }
  ],
  toDOM(): [string] { return ['s']; }
};
