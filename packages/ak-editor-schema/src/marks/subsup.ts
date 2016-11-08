import { Attribute, Mark, MarkType } from 'ak-editor-prosemirror';

type TypeAttr = 'sub' | 'sup'

export class SubSupMarkType extends MarkType {
  create(attrs: { type: TypeAttr }) {
    return super.create(attrs);
  }

  get attrs() {
    return {
      type: new Attribute(),
    };
  }

  get matchDOMTag(): { [tag: string]: { type: TypeAttr }} {
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