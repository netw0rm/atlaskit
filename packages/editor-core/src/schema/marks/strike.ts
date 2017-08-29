import { MarkSpec } from '../../prosemirror';
import { FONT_STYLE } from '../groups';

/**
 * @name strike_mark
 */
export interface Definition {
  type: 'strike';
}

export const strike: MarkSpec = {
  inclusive: true,
  group: FONT_STYLE,
  parseDOM: [
    { tag: 'strike' },
    { tag: 's' },
    { tag: 'del' },
    { style: 'text-decoration', getAttrs: value => value === 'line-through' && null }
  ],
  toDOM(): [string] { return ['s']; }
};
