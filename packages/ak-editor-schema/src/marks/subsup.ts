import { Attribute, Mark, MarkType, Schema } from 'ak-editor-prosemirror';

type TypeAttr = 'sub' | 'sup'

export class SubSupMarkType extends MarkType {
  constructor(name: string, rank: number, schema: Schema) {
    if (name !== 'subsup') {
      throw new Error("SubSupMarkType must be named 'subsup'.")
    }
    super(name, rank, schema);
  }

  create(attrs: { type: TypeAttr }) {
    return super.create(attrs);
  }

  get attrs() {
    return {
      type: new Attribute(),
    };
  }

  get matchDOMTag(): { [tag: string]: { type: TypeAttr } } {
    return {
      sub: { type: 'sub' },
      sup: { type: 'sup' }
    }
  }

  toDOM(mark: SubSupMark) {
    return [mark.attrs.type];
  }
}

export interface SubSupMark extends Mark {
  type: SubSupMarkType;
  attrs: {
    type: TypeAttr;
  };
}

export function isSubSupMark(mark: Mark): mark is SubSupMark {
  return mark.type instanceof SubSupMarkType;
}
