import { EditorState, Transaction, EditorView, ReplaceAroundStep, Slice, NodeRange, liftTarget, Fragment, TextSelection } from '../../prosemirror';
import * as commands from '../../commands';

export const enterKeyCommand = (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
  const { selection } = state;
  if (selection.empty) {
    const { listItem } = state.schema.nodes;
    const node = selection.$from.node(selection.$from.depth - 1);
    const parent = selection.$from.node(selection.$from.depth - 3);
    if ((node && node.textContent.length === 0 && node.type === listItem) &&
      (parent && parent.type === listItem)) {
      return commands.outdentList()(state, dispatch);
    }
  }
  return false;
};

export const toggleBulletList = (state: EditorState<any>, dispatch: (tr: Transaction) => void, view: EditorView): boolean => {
  const { selection } = state;
  const { bulletList, orderedList } = state.schema.nodes;
  const node = selection.$from.node(selection.$from.depth - 2);
  if (!node || node.type !== bulletList) {
    return commands.toggleList('bulletList')(state, dispatch, view);
  } else {
    let rootListDepth;
    for (let i = selection.$from.depth; i > 0; i--) {
      const node = selection.$from.node(i);
      if (node.type === bulletList || node.type === orderedList) {
        rootListDepth = i;
      }
    }
    let tr = liftFollowingList(state, selection.$to.pos, selection.$to.end(rootListDepth), rootListDepth, state.tr);
    tr = liftSelectionList(state, tr);
    dispatch(tr);
    return true;
  }
};

function liftFollowingList(state: EditorState<any>, from: number, to: number, rootListDepth: number, tr: Transaction): Transaction {
  const { listItem } = state.schema.nodes;
  let lifted = false;
  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (!lifted && node.type === listItem && pos > from) {
      lifted = true;
      let listDepth = rootListDepth + 3;
      while (listDepth > rootListDepth + 2) {
        const start = tr.doc.resolve(tr.mapping.map(pos));
        listDepth = start.depth;
        const end = tr.doc.resolve(tr.mapping.map(pos + node.textContent.length));
        const sel = new TextSelection(start, end);
        tr = liftListItem(state, sel, tr);
      }
    }
  });
  return tr;
}

function liftSelectionList(state: EditorState<any>, tr: Transaction): Transaction {
  const { paragraph } = state.schema.nodes;
  const { from, to } = state.selection;
  const listCol: any[] = [];
  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (node.type === paragraph) {
      listCol.push({ node, pos });
    }
  });
  for (let i = listCol.length - 1; i >= 0; i--) {
    const paragraph = listCol[i];
    const start = tr.doc.resolve(tr.mapping.map(paragraph.pos));
    const end = tr.doc.resolve(tr.mapping.map(paragraph.pos + paragraph.node.textContent.length));
    const sel = new TextSelection(start, end);
    const range = sel.$from.blockRange(sel.$to)!;
    tr.lift(range, 0);
  }
  return tr;
}

function liftListItem(state: EditorState<any>, selection, tr: Transaction): Transaction {
  let {$from, $to} = selection;
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
    range = new NodeRange(tr.doc.resolve($from.pos), tr.doc.resolve(endOfList), range.depth);
  }
  return tr.lift(range, liftTarget(range)!).scrollIntoView();
}
