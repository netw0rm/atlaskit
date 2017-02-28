import { Mark, MarkType, Schema, MarkSpec } from '../../prosemirror/future';

export class StrikeMarkType extends MarkType {
  constructor(name: string, rank: number, schema: Schema) {
    if (name !== 'strike') {
      throw new Error('StrikeMarkType must be named "strike".');
    }
    super(name, rank, schema, strike);
  }

  get matchDOMTag() {
    return {
      s: null,
      strike: null
    };
  }

  get matchDOMStyle() {
    return {
      'text-decoration': (value: string) => value === 'line-through' ? null : false,
    };
  }

  toDOM(): [string] {
    return ['s'];
  }
}

export const strike: MarkSpec = {
  parseDOM: [
    { tag: 'strike' },
    { tag: 's' },
    { style: 'text-decoration', getAttrs: value => value === 'line-through' && null }
  ],
  toDOM() { return ['s']; }
};

export interface StrikeMark extends Mark {
  type: StrikeMarkType;
}

export function isStrikeMark(mark: Mark): mark is StrikeMark {
  return mark.type instanceof StrikeMarkType;
}
