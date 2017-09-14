import { Selection } from 'prosemirror-state';
import { Slice } from 'prosemirror-model';

function closedAt(node, side) {
  let newNode = node;
  for (;;) {
    // if (node.inlineContent) return false
    if (newNode.childCount === 0 || newNode.type.spec.isolating) return true;
    newNode = side < 0 ? newNode.firstChild : newNode.lastChild;
  }
}

class GapBookmark {
  constructor(pos) {
    this.pos = pos;
  }
  map(mapping) {
    return new GapBookmark(mapping.map(this.pos));
  }
}
// ::- Gap cursor selections are represented using this class. Its
// `$anchor` and `$head` properties both point at the cursor position.
export default class GapCursor extends Selection {
  // : (ResolvedPos)
  constructor($pos) {
    super($pos, $pos);
  }

  map(doc, mapping) {
    const $pos = doc.resolve(mapping.map(this.$head));
    return GapCursor.valid($pos) ? new GapCursor($pos) : Selection.near($pos);
  }

  static content() {
    return Slice.empty;
  }

  eq(other) {
    return other instanceof GapCursor && other.head === this.head;
  }

  toJSON() {
    return { type: 'gapcursor', pos: this.head };
  }

  static fromJSON(doc, json) {
    return new GapCursor(doc.resolve(json.pos));
  }

  // tslint:disable-next-line:no-use-before-define
  getBookmark() {
    // tslint:disable-next-line:no-use-before-define
    return new GapBookmark(this.anchor);
  }

  static valid($pos) {
    if ($pos.depth > 0 && !$pos.parent.type.spec.isolating) return false;
    const index = $pos.index();
    // FIXME handle row/table exception
    return (index === 0 || closedAt($pos.parent.child(index - 1), 1)) &&
      (index === $pos.parent.childCount || closedAt($pos.parent.child(index), -1));
  }

  static findFrom($pos, dir, mustMove) {
    for (let d = $pos.depth; ; d--) {
      const parent = $pos.node(d);
      if (d === 0 || parent.type.spec.isolating ||
          (dir > 0 ? $pos.indexAfter(d) < parent.childCount : $pos.index(d) > 0)) {
        if (mustMove && d === $pos.depth) return null;
        const $here = $pos.doc.resolve(dir < 0 ? $pos.before(d + 1) : $pos.after(d + 1));
        return GapCursor.valid($here) ? $here : null;
      }
    }
  }
}

GapBookmark.prototype.resolve = (doc) => {
  const $pos = doc.resolve(this.pos);
  return GapCursor.valid($pos) ? new GapCursor($pos) : Selection.near($pos);
};

GapCursor.prototype.visible = false;

Selection.jsonID('gapcursor', GapCursor);
