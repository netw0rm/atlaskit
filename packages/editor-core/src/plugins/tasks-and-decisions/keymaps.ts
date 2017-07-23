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

  const deleteDecisionList = ($from: ResolvedPos, tr: Transaction, content: any) => {
    return tr.replaceWith($from.start($from.depth - 1) - 1, $from.end($from.depth - 1) + 1, content);
  };

  /*
   * Since the DecisionItem only accepts inline-content, we won't get any of the default behaviour from ProseMirror
   * eg. behaviour for backspace and enter etc. So we need to implement it.
   */
  const keymaps = {
    'Backspace': (state: EditorState<any>, dispatch) => {
      const { selection, schema: { nodes }, tr } = state;
      const { decisionList, decisionItem } = nodes;

      if (!decisionItem || !decisionList) {
        return false;
      }

      const { $from } = selection;
      const isFirstItemInDecisionList = $from.node($from.depth).type === decisionItem && $from.index($from.depth - 1) === 0;

      // Don't do anything if the cursor isn't at the begining of the node.
      if ($from.parentOffset !== 0) {
        return false;
      }

      if ($from.depth !== 1 && !isFirstItemInDecisionList) {
        return false;
      }

      const previousPos = tr.doc.resolve(Math.max(0, $from.before(1) - 1));

      if (previousPos.pos === 0 && !isFirstItemInDecisionList) {
        return false;
      }

      if (previousPos.pos > 0 && previousPos.node(1).type === decisionList) {
        const content = $from.node($from.depth).content;

        deleteCurrentItem($from, tr)
          .insert(previousPos.pos, decisionItem.create({}, content))
          .setSelection(new TextSelection(tr.doc.resolve(previousPos.pos + 1)))
          .scrollIntoView()
        ;

        dispatch(tr);

        return true;
      } else if (isFirstItemInDecisionList) {
        const content = schema.nodes.paragraph.create({}, $from.node($from.depth).content);
        const insertPos = previousPos.pos > 0 ? previousPos.pos + 1 : 0;
        const isOnlyChild = $from.node($from.depth - 1).childCount === 1;

        if (!isOnlyChild) {
          deleteCurrentItem($from, tr).insert(insertPos, content)
          ;
        } else {
          deleteDecisionList($from, tr, content);
        }

        tr
          .setSelection(new TextSelection( tr.doc.resolve(insertPos + 1)))
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
      if (
        node && node.type === nodes.decisionItem
      ) {
        const isEmpty = node.textContent.length === 0;
        const decisionList = $from.node($from.depth - 1);
        const end = $from.end($from.depth - 1) + 1;

        if (!isEmpty) {
          tr.split($from.pos, 1, [{type: nodes.decisionItem, attrs: { localId: uuid.generate() }}]);
          dispatch(tr);
          return true;
        }

        // If list is empty, replace with paragraph
        if (isEmpty && decisionList.childCount === 1) {
          deleteDecisionList($from, tr, schema.nodes.paragraph.create({}));
          dispatch(tr);
          return true;
        }

        // If last child, remove it and insert a paragraph
        if (isEmpty && decisionList.child(decisionList.childCount - 1) === node) {
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
