import { MarkType, Mark } from 'ak-editor-prosemirror';

export class DelMarkType extends MarkType {
  get matchDOMTag() {
    return {
      del: null,
      s: null,
      strike: null
    };
  }

  get matchDOMStyle() {
    return {
      'text-decoration': (value: string) => value == 'line-through' ? null : false,
    }
  }

  toDOM() { return ['del']; }
}

export interface DelMark extends Mark {
  type: DelMarkType;
}

export function isDelMark(mark: Mark): mark is DelMark {
  return mark.type instanceof DelMarkType;
}
