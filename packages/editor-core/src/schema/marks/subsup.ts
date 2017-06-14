import { MarkSpec, Mark } from '../../prosemirror';
import { FONT_STYLE } from '../groups';

export interface SubSupMark extends Mark {
  attrs: {
    type: string;
  };
}

export const subsup: MarkSpec = {
  inclusive: true,
  group: FONT_STYLE,
  attrs: { type: { default: 'sub' } },
  parseDOM: [
    { tag: 'sub', attrs: { type: 'sub' } },
    { tag: 'sup', attrs: { type: 'sup' } }
  ],
  toDOM(mark: SubSupMark) { return [mark.attrs.type]; }
};
