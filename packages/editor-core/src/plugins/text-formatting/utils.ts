import { EditorState, TextSelection } from '../../prosemirror';

export const isInsideCode = (state: EditorState<any>) => {
  const { code } = state.schema.marks;
  const { $cursor } = state.selection as TextSelection;
  const { storedMarks } = state.tr;
  return (
    $cursor &&
    $cursor.marks().indexOf(code.create()) > -1 ||
    (storedMarks && storedMarks.indexOf(code.create()) > -1)
  );
};
