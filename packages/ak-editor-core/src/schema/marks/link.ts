import {
  Mark,
  Schema,
  LinkMark as BaseLinkMark,
} from '../../prosemirror';

export class LinkMarkType extends BaseLinkMark {
  constructor(name: string, rank: number, schema: Schema) {
    if (name !== 'link') {
      throw new Error('LinkMarkType must be named "link".');
    }
    super(name, rank, schema);
  }
  get inclusiveRight() {
    return false;
  }
}

export interface LinkMark extends Mark {
  type: LinkMarkType;
  attrs: {
    href: string;
    title?: string;
  };
}

export function isLinkMark(mark: Mark): mark is LinkMark {
  return mark.type instanceof LinkMarkType;
}
