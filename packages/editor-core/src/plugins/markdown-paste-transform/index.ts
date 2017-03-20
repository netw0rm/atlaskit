import {
  Plugin,
  ProseMirror,
  Slice,
  Fragment,
  Node,
} from '../../prosemirror';

export class MarkdownPasteTransform {

  constructor(pm: ProseMirror) {
    pm.on.transformPasted.add(this.transformMarkdown);
  }

  detach(pm: ProseMirror) {
    pm.on.transformPasted.remove(this.transformMarkdown);
  }

  private transformMarkdown = (slice) => {
    let content = transformLinks(slice.content);
    return new Slice(content, slice.openLeft, slice.openRight);
  }
}

const transformLinks = (fragment: Fragment): Fragment => {
  const linkRegex = /\[([^\[]+)\]\(([^\)]+)\)/g;
  const linkified: Array<Node> = [];
  for (let index = 0; index < fragment.childCount; index++) {
    const child = fragment.child(index);
    if (child && child.isText && child.text) {
      let pos = 0;
      let match;
      while (match = linkRegex.exec(child.text)) {
        const start = match.index;
        const end = start + match[0].length;
        const link = child.type.schema.marks.link;
        if (start > 0) {
          linkified.push(child.copy(child.text.slice(pos, start))); // tslint:disable-line
        }
        linkified.push(child.type.create({}, match[1], link.create({href: match[2]}).addToSet(child.marks)));
        pos = end;
      }
      if (pos < child.text.length) {
        linkified.push(child.copy(child.text.slice(pos))); // tslint:disable-line
      }
    } else if (child.content) {
      linkified.push(child.copy(transformLinks(child.content)));
    }
  }
  return Fragment.fromArray(linkified);
};
// code above is inspired from here: https://github.com/ProseMirror/prosemirror/issues/90#issuecomment-202933072
// disable-line has been used to ignore errors as code is otherwise working well.


// IE11 + multiple prosemirror fix.
Object.defineProperty(MarkdownPasteTransform, 'name', { value: 'MarkdownPasteTransform' });

export default new Plugin(MarkdownPasteTransform);
