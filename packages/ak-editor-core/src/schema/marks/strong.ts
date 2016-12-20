import { StrongMark as StrongMarkType } from 'prosemirror/dist/schema-basic';
import { Mark } from '../../prosemirror';

export { StrongMarkType };

export interface StrongMark extends Mark {
  type: StrongMarkType;
}

export function isStrongMark(mark: Mark): mark is StrongMark {
  return mark.type instanceof StrongMarkType;
}
