import { EditorState, Transaction } from '../../prosemirror';
import { Command } from '../../commands';

export const FORMATTING_NODE_TYPES = ['heading'];
export const FORMATTING_MARK_TYPES = ['em', 'code', 'strike', 'strong', 'underline', 'textColor'];

export function clearFormatting(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { tr } = state;

    FORMATTING_MARK_TYPES.forEach(mark => {
      const { from, to } = tr.selection;
      if (state.schema.marks[mark]) {
        tr.removeMark(from, to, state.schema.marks[mark]);
      }
    });

    FORMATTING_NODE_TYPES.forEach(nodeName => {
      const formattedNodeType = state.schema.nodes[nodeName];
      const { $from, $to } = tr.selection;
      tr.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
        if (node.hasMarkup(formattedNodeType)) {
          tr.setNodeMarkup(pos, state.schema.nodes.paragraph);
          return false;
        }
        return true;
      });
    });

    tr.setStoredMarks([]);
    dispatch(tr);
    return true;
  };
}
