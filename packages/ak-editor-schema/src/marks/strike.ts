import { MarkType, Mark, Schema } from 'ak-editor-prosemirror';

export class StrikeMarkType extends MarkType {
  constructor(name: string, rank: number, schema: Schema) {
    if (name !== 'strike') {
      throw new Error("StrikeMark must be named 'strike'.")
    }
    super(name, rank, schema);
  }

  get matchDOMTag() {
    return {
      del: null,
      s: null,
      strike: null
    };
  }

  get matchDOMStyle() {
    return {
      'text-decoration': (value: string) => value === 'line-through' ? null : false,
    }
  }

  toDOM() { return ['s']; }
}

export interface StrikeMark extends Mark {
  type: StrikeMarkType;
}