import { EditorState, TextSelection } from '../../prosemirror';

export const isInsideCode = (state: EditorState<any>): boolean => {
  const { code } = state.schema.marks;
  const { $cursor } = state.selection as TextSelection;

  return (
    $cursor &&
    !!$cursor.marks().filter(mark => mark.type === code).length ||
    (state.tr.storedMarks || []).indexOf(code.create()) > -1
  );
};
