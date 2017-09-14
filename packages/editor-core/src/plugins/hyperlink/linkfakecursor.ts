import { EditorState, TextSelection, Selection, SelectionBookmark, AnyObject } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';
import { Slice, Node, ResolvedPos } from 'prosemirror-model';
import { Mappable } from 'prosemirror-transform';

export class LinkFakeBookmark {
  pos: undefined | number = undefined;
  visible: boolean = false;

  constructor(pos: number) {
    this.pos = pos;
  }

  map(mapping: Mappable): LinkFakeBookmark {
    return new LinkFakeBookmark(mapping.map(this.pos!));
  }

  resolve(doc: Node): Selection {
    const $pos = doc.resolve(this.pos!);
    return Selection.near($pos);
  }
}

export class LinkFakeCursor extends Selection {
  constructor($pos: ResolvedPos) {
    super($pos, $pos);
  }

  map(doc: Node, mapping: Mappable): Selection {
    const $pos = doc.resolve(mapping.map(this.$head.pos));
    return new LinkFakeCursor($pos);
  }

  static content(): Slice {
    return Slice.empty;
  }

  eq(other): boolean {
    return other instanceof LinkFakeCursor && other.head === this.head;
  }

  toJSON(): AnyObject {
    return { type: 'LinkFakeCursor', pos: this.head };
  }

  static fromJSON(doc: Node, json: AnyObject): Selection {
    return new LinkFakeCursor(doc.resolve(json.pos));
  }

  getBookmark(): SelectionBookmark {
    return new LinkFakeBookmark(this.anchor) as SelectionBookmark;
  }
}

Selection.jsonID('linkfakecursor', LinkFakeCursor);

export const addLinkFakeCursor = (editorView: EditorView) => {
  const { $from, $to } = editorView.state.selection;
  if ($from.pos === $to.pos) {
    const { dispatch, state } = editorView;
    dispatch(state.tr.setSelection(new LinkFakeCursor($from) as any));
  }
};

export const removeLinkFakeCursor = (editorView: EditorView) => {
  const { dispatch, state } = editorView;
  if (state.selection instanceof LinkFakeCursor) {
    const { $from } = state.selection;
    dispatch(state.tr.setSelection(new TextSelection($from) as any));
  }
};

export const drawLinkFakeCursor = (state: EditorState): DecorationSet | null => {
  if (!(state.selection instanceof LinkFakeCursor)) {
    return null;
  }
  const node = document.createElement('div');
  node.className = 'ProseMirror-link-fakecursor';
  return DecorationSet.create(
    state.doc,
    [Decoration.widget(state.selection.head, node, { key: 'linkfakecursor' })]
  );
};
