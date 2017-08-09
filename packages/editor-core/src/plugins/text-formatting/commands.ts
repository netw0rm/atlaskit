import { EditorState, Transaction, TextSelection } from '../../prosemirror';
import { isInsideCode } from './utils';

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
    const atRightEdge = currentPosHasCode && !nextPosHasCode;
    const enteringCode = !currentPosHasCode && nextPosHasCode;

    // entering code mark (from the left edge): don't move the cursor, just add the mark
    if ((!insideCode || (!storedMarks || !storedMarks.length)) && enteringCode) {
      dispatch(state.tr.addStoredMark(code.create()));
      return true;
    }

    // at the right edge: add code mark and move the cursor to the right
    // we want to be able to put cursor at the edge of the code mark and continue being inside the mark
    if (insideCode && atRightEdge) {
      const tr = state.tr.addStoredMark(code.create());
      dispatch(tr.setSelection(new TextSelection(state.doc.resolve($cursor.pos + 1))));
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

const moveLeft = (): Command => {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {

    const { code } = state.schema.marks;
    const { empty, $cursor } = state.selection as TextSelection;
    if (!empty || !$cursor) {
      return false;
    }
    const { storedMarks } = state.tr;
    const insideCode = isInsideCode(state);
    const currentPosHasCode = state.doc.rangeHasMark($cursor.pos, $cursor.pos, code);
    const prevPosHasCode = state.doc.rangeHasMark($cursor.pos - 1, $cursor.pos - 1, code);

    const exitingCode = !currentPosHasCode && !prevPosHasCode && Array.isArray(storedMarks);
    const atLeftEdge = currentPosHasCode && !prevPosHasCode && storedMarks === null;
    const atRightEdge = !currentPosHasCode && !prevPosHasCode && storedMarks === null && $cursor.nodeBefore;
    const enteringCode = !currentPosHasCode && prevPosHasCode && Array.isArray(storedMarks) && !storedMarks.length;

    // at the right edge: remove code mark and move the cursor to the left
    if (!insideCode && atRightEdge) {
      const tr = state.tr.setSelection(new TextSelection(state.doc.resolve($cursor.pos - 1)));
      dispatch(tr.removeStoredMark(code));
      return true;
    }

    // entering code mark (from right edge): don't move the cursor, just add the mark
    if (insideCode && enteringCode) {
      dispatch(state.tr.addStoredMark(code.create()));
      return true;
    }

    // exiting code mark (or at the beginning of the line): don't move the cursor, just remove the mark
    if (insideCode && (exitingCode || !$cursor.nodeBefore)) {
      dispatch(state.tr.removeStoredMark(code));
      return true;
    }

    // at the left edge: add code mark and move the cursor to the left
    if (insideCode && atLeftEdge) {
      const tr = state.tr.setSelection(new TextSelection(state.doc.resolve($cursor.pos - 1)));
      dispatch(tr.addStoredMark(code.create()));
      return true;
    }

    return false;
  };
};

export default {
  moveRight,
  moveLeft
};
