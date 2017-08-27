import { MarkSpec, marks } from '../../prosemirror';
import { FONT_STYLE } from '../groups';

/**
 * @name em_mark
 */
export interface Definition {
  type: 'em';
}

export const em: MarkSpec = {...marks.em,
  inclusive: true,
  group: FONT_STYLE,
};
