import { TextSelection, NodeSelection, Plugin, EditorState, Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { keydownHandler } from 'prosemirror-keymap';
import { EditorView } from 'prosemirror-view';
import { atTheBeginningOfDoc, atTheEndOfDoc } from '../../utils';
import FakeCursor from './fakecursor';

export class FakeCursorRight extends FakeCursor {}
export class FakeCursorLeft extends FakeCursor {}
export class FakeMediaCursorRight extends FakeCursorRight {}
export class FakeMediaCursorLeft extends FakeCursorLeft {}

const arrowLeft = (
  state: EditorState,
  dispatch: (tr: Transaction) => void,
  view: EditorView
): boolean => {
  const selection: any = state.selection;
  const { $from } = selection;
  if (selection instanceof FakeCursor) {
    let tr = state.tr;
    if (selection instanceof FakeMediaCursorRight) {
      tr = tr.setSelection(new NodeSelection(state.doc.resolve($from.pos - 1)) as any);
    } else if (selection instanceof FakeCursorLeft) {
      const { pos, depth } = $from;
      if (atTheBeginningOfDoc(state)) {
        const { paragraph } = state.schema.nodes;
        tr = tr.insert(pos - depth, paragraph.create() as any);
        tr = tr.setSelection(new TextSelection(tr.doc.resolve(pos - depth + 1)) as any);
      } else {
        tr = tr.setSelection(new TextSelection(state.doc.resolve(pos - depth - 1)) as any);
      }
    } else {
      const { $to } = selection;
      tr = tr.setSelection(new TextSelection($to) as any);
    }
    dispatch(tr);
    return true;
  }
  if (selection instanceof TextSelection) {
    if (view.endOfTextblock('left')) {
      const node = $from.node(1);
      const nodeType = node.type;
      const { codeBlock, blockquote, panel, table } = state.schema.nodes;
      if (nodeType === codeBlock ||
        nodeType === blockquote ||
        nodeType === panel ||
        ((nodeType === table) && $from.start(4) - 3 === $from.start(1))
      ) {
        dispatch(state.tr.setSelection(new FakeCursorLeft($from as any) as any));
        return true;
      }
    }
  }
  if (selection instanceof NodeSelection) {
    const { mediaGroup } = state.schema.nodes;
    const node = $from.node($from.depth);
    if (node && node.type === mediaGroup) {
      dispatch(state.tr.setSelection(new FakeMediaCursorLeft($from as any) as any));
      return true;
    }
  }
  return false;
};

const arrowRight = (
  state: EditorState,
  dispatch: (tr: Transaction) => void,
  view: EditorView
): boolean => {
  const selection: any = state.selection;
  const { $to } = selection;
  const { pos, doc } = $to;
  if (selection instanceof FakeCursor) {
    let tr = state.tr;
    if (selection instanceof FakeMediaCursorLeft) {
      tr = tr.setSelection(new NodeSelection(doc.resolve(pos)) as any);
    } else if (selection instanceof FakeCursorLeft) {
      tr = tr.setSelection(new TextSelection(doc.resolve(pos)) as any);
    } else {
      const { $to } = selection;
      const { pos, depth } = $to;
      const { paragraph } = state.schema.nodes;
      if (atTheEndOfDoc(state)) {
        tr = tr.insert(pos + depth, paragraph.create());
        tr = tr.setSelection(new TextSelection(tr.doc.resolve(pos + depth + 1)) as any);
      } else {
        tr = tr.insert(pos + depth, paragraph.create());
        tr = tr.setSelection(new TextSelection(doc.resolve(pos + depth + 1)) as any);
      }
    }
    dispatch(tr);
    return true;
  } else {
    if (view.endOfTextblock('right')) {
      const node = $to.node(1);
      const nodeType = node && node.type;
      const { codeBlock, blockquote, panel, table } = state.schema.nodes;
      if (nodeType === codeBlock ||
        nodeType === blockquote ||
        nodeType === panel ||
        ((nodeType === table) && $to.end(4) + 3 === $to.end(1))
      ) {
        dispatch(state.tr.setSelection(new FakeCursorRight($to as any) as any));
        return true;
      }
    }
  }
  if (selection instanceof NodeSelection) {
    const { mediaGroup } = state.schema.nodes;
    const node = $to.node($to.depth);
    if (node && node.type === mediaGroup) {
      dispatch(state.tr.setSelection(new FakeMediaCursorRight($to as any) as any));
      return true;
    }
  }
  return false;
};

const arrowUp = (
  state: EditorState,
  dispatch: (tr: Transaction) => void,
  view: EditorView
): boolean => {
  const { selection, doc } = state;
  const { pos, depth } = state.selection.$to;
  if (selection instanceof FakeCursor) {
    let tr = state.tr.setSelection(
      new TextSelection(
        doc.resolve(pos - depth - 1)
    ) as any);
    dispatch(tr);
    return true;
  }
  return false;
};

const handleKeyDown = keydownHandler({
  ArrowLeft: arrowLeft,
  ArrowRight: arrowRight,
  ArrowUp: arrowUp
});

const handleTextInput = (view: EditorView, from: number, to: number, text: string): boolean => {
  const { state, dispatch } = view;
  const selection: any = state.selection;
  if (selection instanceof FakeCursor) {
    let tr = state.tr;
    const { pos, depth } = selection.$from;
    const { paragraph } = state.schema.nodes;
    if (selection instanceof FakeCursorLeft) {
      tr = tr.insert(pos - depth, paragraph.create());
      tr = tr.setSelection(new TextSelection(state.doc.resolve(pos - depth + 1)) as any);
    } else {
      tr = tr.setSelection(new TextSelection(state.doc.resolve(pos + depth)) as any);
    }
    dispatch(tr);
  }
  return false;
};

const drawFakeCursor = (state: EditorState): DecorationSet | null => {
  if (!(state.selection instanceof FakeCursor)) {
    return null;
  }
  let node = document.createElement('span');
  const decorations = [Decoration.widget(state.selection.head, node, { key: 'fakecursor' })];
  if (state.selection instanceof FakeCursorLeft) {
    node.className = 'ProseMirror-fakecursor ProseMirror-fakecursor-left';
  } else {
    node.className = 'ProseMirror-fakecursor ProseMirror-fakecursor-right';
    const nodeCaretCover = document.createElement('span');
    nodeCaretCover.className = 'Fakecursor-caret-cover';
    decorations.push(Decoration.widget(state.selection.head, nodeCaretCover, { key: 'caretcover' }));
  }
  return DecorationSet.create(
    state.doc,
    decorations
  );
};

const onBlur = (view: EditorView) => {
  const { state, dispatch } = view;
  if (state.selection instanceof FakeCursor) {
    dispatch(
      state.tr.setSelection(
        new TextSelection(state.selection.$from, state.selection.$to)
      ) as any
    );
  }
};

export { FakeCursor };

export const fakeCursor = () =>
  new Plugin({
    props: {
      decorations: drawFakeCursor,
      handleKeyDown,
      handleTextInput,
      onBlur
    },
  });

/**
 * FakeCursor plugin is inspired by Marijn's work:
 * https://github.com/ProseMirror/prosemirror-fakecursor
 */

// ensure multiples of 4 in styles
// take care to hide default cursor for all panel types
// take care to hide default cursor for bb table
// use atlaskit color shades
// arrowRight handling in table
// fix table cursor issue
