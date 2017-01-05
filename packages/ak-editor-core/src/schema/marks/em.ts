import { EmMark as BaseEmMark } from 'prosemirror/dist/schema-basic';
import { Mark, Schema } from '../../prosemirror';

export class EmMarkType extends BaseEmMark {
  constructor(name: string, rank: number, schema: Schema) {
    if (name !== 'em') {
      throw new Error('EmMarkType must be named "em".');
    }
    super(name, rank, schema);
  }
}

export interface EmMark extends Mark {
  type: EmMarkType;
}

export function isEmMark(mark: Mark): mark is EmMark {
  return mark.type instanceof EmMarkType;
}
