import { StrongMark as StrongMarkType, Mark } from 'ak-editor-prosemirror';

export { StrongMarkType };

export interface StrongMark extends Mark {
  type: StrongMarkType;
}

export function isStrongMark(mark: Mark): mark is StrongMark {
  return mark.type instanceof StrongMarkType;
}
