import { EditorState, Fragment, liftTarget, TextSelection, Transaction, ReplaceAroundStep, NodeRange, Slice, Node } from '../../prosemirror';
import { Command } from '../../commands';

export function clearFormatting(markTypes: Array<string>): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    let { tr } = state;
    const { from, to } = state.selection;
    const { paragraph } = state.schema.nodes;
    markTypes.forEach(mark => tr.removeMark(from, to, state.schema.marks[mark]));
    tr.setStoredMarks([]);
    if (paragraph) {
      tr.setBlockType(from, to, paragraph);
      tr = liftAllNodes(state, tr);
    }
    dispatch(tr);
    return true;
  };
}

function liftAllNodes(state: EditorState<any>, tr: Transaction): Transaction {
  const { text, listItem } = state.schema.nodes;
  const { from, to } = state.selection;
  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (node.type === text) {
      const start = tr.doc.resolve(tr.mapping.map(pos));
      const end = tr.doc.resolve(tr.mapping.map(pos + node.textContent.length));
      const sel = new TextSelection(start, end);
      if (sel.$from.depth > 0) {
        const range = sel.$from.blockRange(sel.$to)!;
        tr.lift(range, liftTarget(range)!);
      }
    } else if (node.type === listItem && node.childCount > 1) {
      tr = liftSubList(state, node, pos, tr);
    }
  });
  return tr;
}

function liftSubList(state: EditorState<any>, listNode: Node, listPos: number, tr: Transaction): Transaction {
  const { text, bulletList, orderedList } = state.schema.nodes;
  listNode.descendants((node, pos) => {
    if (node.type === bulletList || node.type === orderedList) {
      let startPos;
      let endpos;
      node.descendants((child, childPos) => {
        if (child.type === text) {
          if (!startPos) {
            startPos = listPos + pos + childPos;
          }
          endpos = listPos + pos + childPos + child.textContent.length;
        }
      });
      const selectionStart = state.selection.$from.pos;
      const startLocation = startPos > selectionStart ? startPos : selectionStart;
      const start = tr.doc.resolve(tr.mapping.map(startLocation));
      const end = tr.doc.resolve(tr.mapping.map(endpos));
      const sel = new TextSelection(start, end);
      tr = liftListItem(state, sel, tr);
    }
  });
  return tr;
}

function liftListItem(state: EditorState<any>, selection, tr: Transaction): Transaction {
  let {$from, $to} = selection;
  const tf = tr.doc.resolve(tr.mapping.map(state.selection.$from.pos));
  const nodeType = state.schema.nodes.listItem;
  let range = $from.blockRange($to, node => node.childCount && node.firstChild.type === nodeType);
  if (!range || range.depth < 2 || $from.node(range.depth - 1).type !== nodeType) { return tr; }
  let end = range.end;
  let endOfList = $to.end(range.depth);
  if (end < endOfList) {
    tr.step(
      new ReplaceAroundStep(
        end - 1,
        endOfList,
        end,
        endOfList,
        new Slice(Fragment.from(nodeType.create(null, range.parent.copy())), 1, 0),
        1,
        true
      )
    );
    range = new NodeRange(tr.doc.resolveNoCache(tf.pos), tr.doc.resolveNoCache(endOfList), range.depth);
  }
  return tr.lift(range, liftTarget(range)!).scrollIntoView();
}
