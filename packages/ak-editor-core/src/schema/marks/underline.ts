import { MarkType, Mark, Schema } from 'ak-editor-prosemirror';

export class UnderlineMarkType extends MarkType {
  constructor(name: string, rank: number, schema: Schema) {
    if (name !== 'u') {
      throw new Error("UnderlineMarkType must be named 'u'.")
    }
    super(name, rank, schema);
  }

  create() {
    return super.create();
  }

  get matchDOMTag() {
    return {
      u: null
    };
  }

  get matchDOMStyle() {
    return {
      "text-decoration": (value: string) => {
        if (value === "underline") {
          return null;
        }
      }
    };
  }

  toDOM() {
    return ["u"];
  }
}

export interface UnderlineMark extends Mark {
  type: UnderlineMarkType;
}

export function isUnderlineMark(mark: Mark): mark is UnderlineMark {
  return mark.type instanceof UnderlineMarkType;
}
