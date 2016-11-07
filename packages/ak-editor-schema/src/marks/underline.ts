import { MarkType, Mark } from 'ak-editor-prosemirror';

export class UnderlineMarkType extends MarkType {
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
    return ["u"]
  }
}

export interface UnderlineMark extends Mark {
  type: UnderlineMarkType;
}
