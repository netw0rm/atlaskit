import { Selection, SelectionBookmark, AnyObject } from 'prosemirror-state';
import { Slice, Node, ResolvedPos } from 'prosemirror-model';
import { Mappable } from 'prosemirror-transform';

class FakeBookmark {
  pos: undefined | number = undefined;
  visible: boolean = false;

  constructor(pos: number) {
    this.pos = pos;
  }

  map(mapping: Mappable): FakeBookmark {
    return new FakeBookmark(mapping.map(this.pos!));
  }

  resolve(doc: Node) {
    const $pos = doc.resolve(this.pos!);
    return new FakeCursor($pos);
  }
}

export default class FakeCursor extends Selection {

  constructor($pos: ResolvedPos) {
    super($pos, $pos);
  }

  map(doc: Node, mapping: Mappable): Selection {
    const $pos = doc.resolve(mapping.map(this.$head.pos));
    return new FakeCursor($pos);
  }

  static content(): Slice {
    return Slice.empty;
  }

  eq(other): boolean {
    return other instanceof FakeCursor && other.head === this.head;
  }

  toJSON(): AnyObject {
    return { type: 'fakecursor', pos: this.head };
  }

  static fromJSON(doc: Node, json: AnyObject): Selection {
    return new FakeCursor(doc.resolve(json.pos));
  }

  getBookmark(): SelectionBookmark {
    return new FakeBookmark(this.anchor) as SelectionBookmark;
  }
}

Selection.jsonID('fakecursor', FakeCursor);
