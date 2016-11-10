import { LinkMark as BaseLinkMark, Mark } from 'ak-editor-prosemirror';

export class LinkMarkType extends BaseLinkMark {
  get inclusiveRight() {
    return false;
  }
}

export interface LinkMark extends Mark {
  type: LinkMarkType;
}

export function isLinkMark(mark: Mark): mark is LinkMark {
  return mark.type instanceof LinkMarkType;
}
