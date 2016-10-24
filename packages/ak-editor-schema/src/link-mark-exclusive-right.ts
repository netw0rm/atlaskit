import { LinkMark } from 'ak-editor-prosemirror';

class LinkMarkExclusiveRight extends LinkMark {
  get inclusiveRight() {
    return false;
  }
}

export default LinkMarkExclusiveRight;
