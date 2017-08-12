import { EditorState, EditorView, Transaction, TextSelection, Selection } from '../../prosemirror';
import { isInsideCode, removeIgnoredNodesLeft } from './utils';

export interface Command {
  (state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;
}

const moveRight = (): Command => {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const { code } = state.schema.marks;
    const { empty, $cursor } = state.selection as TextSelection;
    if (!empty || !$cursor) {
      return false;
    }

    const { storedMarks } = state.tr;
    const insideCode = isInsideCode(state);
    const currentPosHasCode = state.doc.rangeHasMark($cursor.pos, $cursor.pos, code);
    const nextPosHasCode = state.doc.rangeHasMark($cursor.pos + 1, $cursor.pos + 1, code);

    const exitingCode = !currentPosHasCode && !nextPosHasCode && (!storedMarks || storedMarks.length);
    const enteringCode = !currentPosHasCode && nextPosHasCode;

    // entering code mark (from the left edge): don't move the cursor, just add the mark
    if ((!insideCode || (!storedMarks || !storedMarks.length)) && enteringCode) {
      dispatch(state.tr.addStoredMark(code.create()));
      return true;
    }

    // exiting code mark: don't move the cursor, just remove the mark
    if (insideCode && exitingCode) {
      dispatch(state.tr.removeStoredMark(code));
      return true;
    }

    return false;
  };
};

const moveLeft = (view: EditorView): Command => {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const { code } = state.schema.marks;
    const { empty, $cursor } = state.selection as TextSelection;
    if (!empty || !$cursor) {
      return false;
    }

    // removing ignored nodes (cursor wrapper) to make sure cursor isn't stuck
    removeIgnoredNodesLeft(view);

    const { storedMarks } = state.tr;
    const insideCode = isInsideCode(state);
    const currentPosHasCode = state.doc.rangeHasMark($cursor.pos, $cursor.pos, code);
    const nextPosHasCode = state.doc.rangeHasMark($cursor.pos - 1, $cursor.pos - 1, code);
    const nextNextPosHasCode = state.doc.rangeHasMark($cursor.pos - 2, $cursor.pos - 2, code);

    const exitingCode = !currentPosHasCode && !nextPosHasCode && Array.isArray(storedMarks);
    const atLeftEdge = currentPosHasCode && !nextPosHasCode && storedMarks === null;
    const atRightEdge = !currentPosHasCode && !nextPosHasCode && nextNextPosHasCode && storedMarks === null;
    const enteringCode = !currentPosHasCode && nextPosHasCode && Array.isArray(storedMarks) && !storedMarks.length;

    // at the right edge: remove code mark and move the cursor to the left
    if (!insideCode && atRightEdge) {
      const tr = state.tr.setSelection(Selection.near(state.doc.resolve($cursor.pos - 1)));
      dispatch(tr.removeStoredMark(code));
      return true;
    }

    // entering code mark (from right edge): don't move the cursor, just add the mark
    if (insideCode && enteringCode) {
      dispatch(state.tr.addStoredMark(code.create()));
      return true;
    }

    // // exiting code mark (or at the beginning of the line): don't move the cursor, just remove the mark
    if (insideCode && (exitingCode || !$cursor.nodeBefore)) {
      dispatch(state.tr.removeStoredMark(code));
      return true;
    }

    // at the left edge: add code mark and move the cursor to the left
    if (insideCode && atLeftEdge) {
      const tr = state.tr.setSelection(Selection.near(state.doc.resolve($cursor.pos - 1)));
      dispatch(tr.addStoredMark(code.create()));
      return true;
    }

    return false;
  };
};

// removing ignored nodes (cursor wrapper) when pressing Backspace to make sure cursor isn't stuck
export const removeIgnoredNodes = (view: EditorView): Command => {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    removeIgnoredNodesLeft(view);
    return false;
  };
};

export default {
  moveRight,
  moveLeft,
  removeIgnoredNodes
};
