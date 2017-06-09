import { MarkSpec, marks } from '../../prosemirror';
import { FONT_STYLE } from '../groups';

export const strong: MarkSpec = {
  ...marks.strong,
  inclusive: true,
  group: FONT_STYLE,
};
