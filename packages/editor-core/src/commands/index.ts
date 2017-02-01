import { EditorState, Transaction } from '../prosemirror/future';

export * from '../prosemirror/future/prosemirror-commands/commands';

export function toggleCodeBlock() {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const {$from, $to} = state.selection;
    if ($from.parent.type !== state.schema.nodes.codeBlock) {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.codeBlock));
    } else {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.paragraph));
    }

    return true;
  };
}
