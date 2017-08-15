import {
  EditorState,
  keymap,
  Schema,
  TextSelection,
  Transaction,
  Plugin,
  ResolvedPos,
 } from '../../prosemirror';
import uuid from './uuid';
export function keymapPlugin(schema: Schema<any, any>): Plugin | undefined {

  const deleteCurrentItem = ($from: ResolvedPos, tr: Transaction ) => {
    return tr.delete($from.before($from.depth) - 1, $from.end($from.depth) + 1);
  };

  const deleteList = ($from: ResolvedPos, tr: Transaction, content: any) => {
    return tr.replaceWith($from.start($from.depth - 1) - 1, $from.end($from.depth - 1) + 1, content);
  };

  /*
   * Since the DecisionItem and TaskItem only accepts inline-content, we won't get any of the default behaviour from ProseMirror
   * eg. behaviour for backspace and enter etc. So we need to implement it.
   */
  const keymaps = {
    'Backspace': (state: EditorState<any>, dispatch) => {
      const { selection, schema: { nodes }, tr } = state;
      const { decisionList, decisionItem, taskList, taskItem } = nodes;

      if ((!decisionItem || !decisionList) && (!taskList || !taskItem)) {
        return false;
      }

      const { $from, $to } = selection;

      // Don't do anything if selection is a range
      if ($from.pos !== $to.pos) {
        return false;
      }

      const nodeType = $from.node($from.depth).type;
      const isFirstItemInList = (nodeType === decisionItem || nodeType === taskItem) && $from.index($from.depth - 1) === 0;

      // Don't do anything if the cursor isn't at the begining of the node.
      if ($from.parentOffset !== 0) {
        return false;
      }

      if ($from.depth !== 1 && !isFirstItemInList) {
        return false;
      }

      const previousPos = tr.doc.resolve(Math.max(0, $from.before(1) - 1));

      if (previousPos.pos === 0 && !isFirstItemInList) {
        return false;
      }

      const previousNodeType = previousPos.pos > 0 && previousPos.node(1).type;
      const parentNodeType = $from.node(1).type;
      const previousNodeIsList = (previousNodeType === decisionList || previousNodeType === taskList);
      const parentNodeIsList = (parentNodeType === decisionList || parentNodeType === taskList);

      if (previousNodeIsList && !parentNodeIsList) {
        const content = $from.node($from.depth).content;
        const itemType = previousNodeType === decisionList ? decisionItem : taskItem;

        deleteCurrentItem($from, tr)
          .insert(previousPos.pos, itemType.create({}, content))
          .setSelection(new TextSelection(tr.doc.resolve(previousPos.pos + 1)))
          .scrollIntoView()
        ;

        dispatch(tr);

        return true;
      } else if (isFirstItemInList) {
        const content = schema.nodes.paragraph.create({}, $from.node($from.depth).content);
        const insertPos = previousPos.pos > 0 ? previousPos.pos + 1 : 0;
        const isOnlyChild = $from.node($from.depth - 1).childCount === 1;

        if (!isOnlyChild) {
          deleteCurrentItem($from, tr).insert(insertPos, content)
          ;
        } else {
          deleteList($from, tr, content);
        }

        tr
          .setSelection(new TextSelection(tr.doc.resolve(insertPos + 1)))
          .scrollIntoView()
        ;

        dispatch(tr);

        return true;
      }
    },
    'Enter': (state: EditorState<any>, dispatch) => {
      const { selection, tr, schema: { nodes } } = state;
      const { $from } = selection;
      const node = $from.node($from.depth);
      const nodeType = node && node.type;
      const nodeIsTaskOrDecisionItem = nodeType === nodes.decisionItem || nodeType === nodes.taskItem;
      const isEmpty = node && node.textContent.length === 0;

      if (nodeIsTaskOrDecisionItem) {
        const list = $from.node($from.depth - 1);
        const end = $from.end($from.depth - 1) + 1;

        if (!isEmpty) {
          tr.split($from.pos, 1, [{type: nodeType, attrs: { localId: uuid.generate() }}]);
          dispatch(tr);
          return true;
        }

        // If list is empty, replace with paragraph
        if (isEmpty && list.childCount === 1) {
          deleteList($from, tr, schema.nodes.paragraph.create({}));
          dispatch(tr);
          return true;
        }

        // If last child, remove it and insert a paragraph
        if (isEmpty && list.child(list.childCount - 1) === node) {
          tr.insert(end, schema.nodes.paragraph.create({}));
          deleteCurrentItem($from, tr);
          dispatch(tr);
          return true;
        }
      }
      return false;
    }
  };
  return keymap(keymaps);
}

export default keymapPlugin;
