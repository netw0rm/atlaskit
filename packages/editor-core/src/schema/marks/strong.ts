import {
  Mark,
  Schema,
  StrongMark as BaseStrongMark
} from '../../prosemirror';

export class StrongMarkType extends BaseStrongMark {
  constructor(name: string, rank: number, schema: Schema) {
    if (name !== 'strong') {
      throw new Error('StrongMarkType must be named "strong".');
    }
    super(name, rank, schema);
  }
}

export interface StrongMark extends Mark {
  type: StrongMarkType;
}

export function isStrongMark(mark: Mark): mark is StrongMark {
  return mark.type instanceof StrongMarkType;
}
