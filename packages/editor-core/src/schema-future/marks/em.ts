import {
  EmMark as BaseEmMark,
  Mark,
  Schema,
  MarkSpec
} from '../../prosemirror/future';

export class EmMarkType extends BaseEmMark {
  constructor(name: string, rank: number, schema: Schema) {
    if (name !== 'em') {
      throw new Error('EmMarkType must be named "em".');
    }
    super(name, rank, schema, em);
  }
}

export const em: MarkSpec = {
  parseDOM: [
    { tag: 'i' },
    { tag: 'em' },
    { style: 'font-style', getAttrs: value => value === 'italic' && null }
  ],
  toDOM() { return ['em']; }
};

export interface EmMark extends Mark {
  type: EmMarkType;
}

export function isEmMark(mark: Mark): mark is EmMark {
  return mark.type instanceof EmMarkType;
}
