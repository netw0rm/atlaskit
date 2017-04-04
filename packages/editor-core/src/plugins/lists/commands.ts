import { EditorState, Transaction } from '../../prosemirror';
import * as commands from '../../commands';

export const enterKeyCommand = (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
  const { selection } = state;
  if (selection.empty) {
    const { listItem } = state.schema.nodes;
    const textNode = selection.$from.node(selection.$from.depth);
    const node = selection.$from.node(selection.$from.depth - 1);
    const parent = selection.$from.node(selection.$from.depth - 3);
    if (textNode.textContent.length === 0 && node.type === listItem && parent.type === listItem) {
      return commands.outdentList()(state, dispatch);
    }
  }
  return false;
};
