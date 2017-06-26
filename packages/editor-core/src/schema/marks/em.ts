import { MarkSpec, marks } from '../../prosemirror';
import { FONT_STYLE } from '../groups';

export const em: MarkSpec = {...marks.em,
  inclusive: true,
  group: FONT_STYLE,
};
