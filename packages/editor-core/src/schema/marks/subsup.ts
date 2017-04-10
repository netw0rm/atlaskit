import { MarkSpec, Mark } from '../../prosemirror';

export interface SubSupMark extends Mark {
  attrs: {
    type: string;
  };
}

export const subsup: MarkSpec = {
  inclusive: true,
  attrs: { type: { default: 'sub' } },
  parseDOM: [
    { tag: 'sub', attrs: { type: 'sub' } },
    { tag: 'sup', attrs: { type: 'sup' } }
  ],
  toDOM(mark: SubSupMark) { return [mark.attrs.type]; }
};
