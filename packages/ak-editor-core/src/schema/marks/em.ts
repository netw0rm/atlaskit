import { EmMark as EmMarkType } from 'prosemirror/dist/schema-basic';
import { Mark } from '../../prosemirror';

export { EmMarkType };

export interface EmMark extends Mark {
  type: EmMarkType;
}

export function isEmMark(mark: Mark): mark is EmMark {
  return mark.type instanceof EmMarkType;
}
