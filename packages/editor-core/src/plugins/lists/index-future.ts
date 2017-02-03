import {
  canSplit,
  EditorState,
  EditorView,
  findWrapping,
  Fragment,
  joinPoint,
  NodeSelection,
  NodeType,
  Plugin,
  ReplaceAroundStep,
  Slice,
  Transaction,
} from '../../prosemirror/future';
import {
  canJoinDown,
  canJoinUp,
  findAncestorPosition,
  isRangeOfType,
  liftSelection,
} from '../../utils/index-future';

import {
  isBulletListNode,
  isOrderedListNode
} from '../../schema';

import { trackAndInvoke } from '../../analytics';
import * as keymaps from '../keymaps/utils-future';

export type StateChangeHandler = (state: ListsState) => any;

/**
 *
 * Plugin State
 *
 */
export class ListsState {
  private changeHandlers: StateChangeHandler[] = [];

  // public state
  bulletListActive = false;
  bulletListDisabled = false;
  bulletListHidden = false;
  orderedListActive = false;
  orderedListDisabled = false;
  orderedListHidden = false;

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];

    // Checks what types of lists schema supports.
    const { bullet_list, ordered_list } = state.schema.nodes;
    this.bulletListHidden = !bullet_list;
    this.orderedListHidden = !ordered_list;
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  triggerOnChange() {
    this.changeHandlers.forEach(cb => cb(this));
  }

  toggleBulletList(editorView) {
    toggleBulletList()(editorView.state, editorView.dispatch, editorView);
  }

  toggleOrderedList(editorView) {
    toggleOrderedList()(editorView.state, editorView.dispatch, editorView);
  }

  isWrappingPossible(nodeType, state) {
    const {$from, $to} = state.selection;
    const range = $from.blockRange($to);

    if (!range) { return false; }

    const wrap = findWrapping(range, nodeType);

    if (!wrap) { return false; }

    return true;
  }

  update(newEditorState) {
    const { doc, selection } = newEditorState;
    const ancestorPosition = findAncestorPosition(doc, selection.$from);
    const rootNode = selection instanceof NodeSelection
      ? selection.node
      : ancestorPosition.node(ancestorPosition.depth)!;

    let dirty = false;

    const newBulletListActive = isBulletListNode(rootNode);
    if (newBulletListActive !== this.bulletListActive) {
      this.bulletListActive = newBulletListActive;
      dirty = true;
    }

    const newOrderedListActive = isOrderedListNode(rootNode);
    if (newOrderedListActive !== this.orderedListActive) {
      this.orderedListActive = newOrderedListActive;
      dirty = true;
    }

    const anyListActive = newBulletListActive || newOrderedListActive;

    const newBulletListDisabled = !(anyListActive || this.isWrappingPossible(newEditorState.schema.nodes.bullet_list, newEditorState));
    if (newBulletListDisabled !== this.bulletListDisabled) {
      this.bulletListDisabled = newBulletListDisabled;
      dirty = true;
    }

    const newOrderedListDisabled = !(anyListActive || this.isWrappingPossible(newEditorState.schema.nodes.ordered_list, newEditorState));
    if (newOrderedListDisabled !== this.orderedListDisabled) {
      this.orderedListDisabled = newOrderedListDisabled;
      dirty = true;
    }

    if (dirty) {
      this.triggerOnChange();
    }
  }
};

/**
 *
 * Transforms
 *
 */

/**
 * Wraps selection in list according to nodeType (Bullet List | Ordered List).
 *
 * For selection:
 *
 * doc
 * <{p text
 *   p text
 *   p text}>
 *
 * Result:
 *
 * doc
 *   ul
 *     li
 *       p text
 *       p text
 *       p text
 */
const wrapSelectionInList = (nodeType: NodeType, attrs?) => (state: EditorState<any>, transaction?: Transaction) => {
  const {$from, $to} = state.selection;
  const range = $from.blockRange($to);
  const tr = transaction || state.tr;

  if (!range) { return; }

  const wrap = findWrapping(range, nodeType, attrs);

  if (!wrap) { return; }

  const content = wrap
    .reduceRight((fragment, wrapItem) => Fragment.from(wrapItem.type.create(wrapItem.attrs, fragment)), Fragment.empty);

  tr.step(
    new ReplaceAroundStep(range.start, range.end, range.start, range.end, new Slice(content, 0, 0), wrap.length, true)
  );

  return tr;
};

/**
 * Splits list item with multiple blocks inside into separate list items.
 *
 * For list item:
 *
 * doc
 *   ul
 *     li
 *       p text
 *       p text
 *       p text
 *
 * Result:
 *
 * doc
 *   ul
 *     li
 *       p text
 *     li
 *       p text
 *     li
 *       p text
 */
const splitListItemWithMultipleBlocks = (nodeType: NodeType, attrs?) => (state: EditorState<any>, transaction?: Transaction) => {
  const {$from, $to} = state.selection;
  const range = $from.blockRange($to);
  const tr = transaction || state.tr;

  if (!range) { return; }

  const wrap = findWrapping(range, nodeType, attrs);

  if (!wrap) { return; }

  const found = wrap.reduce((depth, wrapItem, index) => wrapItem.type === nodeType ? index + 1 : depth, 0);
  const splitDepth = wrap.length - found;
  const parent = range.parent;
  let splitPos = range.start + wrap.length;

  for (let i = range.startIndex, first = true; i < range.endIndex; i++, first = false) {
    if (!first && canSplit(tr.doc, splitPos, splitDepth)) {
      tr.split(splitPos, splitDepth);
    }

    splitPos += parent.child(i).nodeSize + (first ? 0 : 2 * splitDepth);
  }

  return tr;
};

/**
 * Splits list item when into 2 list items.
 */
const splitListItem = (nodeType: NodeType) => (state: EditorState<any>, transaction?: Transaction) => {
  const tr = transaction || state.tr;
  const {$from, $to, node} = state.selection as NodeSelection;

  if ((node && node.isBlock) || !($from.parent.content as any).size || $from.depth < 2 || !$from.sameParent($to)) {
    return;
  }

  const grandParent = $from.node(-1);

  if (grandParent.type !== nodeType) {
    return;
  }

  tr.delete($from.pos, $to.pos);

  if (!canSplit(tr.doc, $from.pos, 2)) {
    return;
  }

  return tr.split($from.pos, 2).scrollIntoView();
};

/**
 * Lifts all list items out of list.
 *
 * For structure:
 *
 * doc
 *   ul
 *     li
 *       p text
 *     li
 *       p text
 *     li
 *       p text
 *
 * Result:
 *
 * doc
 *   p text
 *   p text
 *   p text
 */
const liftListItems = () => (state: EditorState<any>, transaction?: Transaction) => {
  const tr = transaction || state.tr;
  const {$from, $to} = tr.selection;
  return liftSelection(tr, tr.doc, $from, $to);
};

/**
 * Joins 2 lists up.
 *
 * For structure:
 *
 * doc
 *   ul
 *     li
 *       p text
 *   ul
 *     li
 *       p text
 *     li
 *       p text
 *
 * Result:
 *
 * doc
 *   ul
 *     li
 *       p text
 *     li
 *       p text
 *     li
 *       p text
 */
const joinUp = (nodeType: NodeType) => (state: EditorState<any>, transaction?: Transaction) => {
  const tr = transaction || state.tr;

  if (canJoinUp(tr.selection, tr.doc, nodeType)) {
    const res = tr.doc.resolve(tr.selection.$from.before(findAncestorPosition(tr.doc, tr.selection.$from).depth));
    const point = joinPoint(tr.doc, res.pos, -1);
    if (point) {
      tr.join(point);
    }
  }

  return tr;
};

/**
 * Joins 2 lists down.
 *
 * For structure:
 *
 * doc
 *   ul
 *     li
 *       p text
 *   ul
 *     li
 *       p text
 *     li
 *       p text
 *
 * Result:
 *
 * doc
 *   ul
 *     li
 *       p text
 *     li
 *       p text
 *     li
 *       p text
 */
const joinDown = (nodeType: NodeType) => (state: EditorState<any>, transaction?: Transaction) => {
  const tr = transaction || state.tr;

  if (canJoinDown(tr.selection, tr.doc, nodeType)) {
    const res = tr.doc.resolve(tr.selection.$to.after(findAncestorPosition(tr.doc, tr.selection.$to).depth));
    const point = joinPoint(tr.doc, res.pos, 1);
    if (point) {
      tr.join(point);
    }
  }

  return tr;
};


/**
 * Helper for running sequence of transforms.
 */
const composeTransforms = (...args) => (state, dispatch) => {
  const tr = args.reduce((tr, command) => command(state, tr), undefined);

  if (dispatch && tr) {
    dispatch(tr);
    return true;
  }

  return false;
};

/**
 *
 * Commands
 *
 */

export const toggleBulletList = () => (state: EditorState<any>, dispatch?, view?: EditorView) => {
  if (!view) {
    return;
  }

  if (isRangeOfType(state.doc, state.selection.$from, state.selection.$to, state.schema.nodes.bullet_list)) {
    return composeTransforms(liftListItems())(view.state, view.dispatch);
  }

  if (isRangeOfType(state.doc, state.selection.$from, state.selection.$to, state.schema.nodes.ordered_list)) {
    composeTransforms(liftListItems())(view.state, view.dispatch);
  }

  return composeTransforms(
    wrapSelectionInList(state.schema.nodes.bullet_list),
    splitListItemWithMultipleBlocks(state.schema.nodes.bullet_list),
    joinUp(state.schema.nodes.bullet_list),
    joinDown(state.schema.nodes.bullet_list)
  )(view.state, view.dispatch);
};

export const toggleOrderedList = () => (state: EditorState<any>, dispatch?, view?: EditorView) => {
  if (!view) {
    return;
  }

  if (isRangeOfType(state.doc, state.selection.$from, state.selection.$to, state.schema.nodes.ordered_list)) {
    return composeTransforms(liftListItems())(view.state, view.dispatch);
  }

  if (isRangeOfType(state.doc, state.selection.$from, state.selection.$to, state.schema.nodes.bullet_list)) {
    composeTransforms(liftListItems())(view.state, view.dispatch);
  }

  return composeTransforms(
    wrapSelectionInList(state.schema.nodes.ordered_list),
    splitListItemWithMultipleBlocks(state.schema.nodes.ordered_list),
    joinUp(state.schema.nodes.ordered_list),
    joinDown(state.schema.nodes.order_list)
  )(view.state, view.dispatch);
};

/**
 *
 * Preparing Exports
 *
 */

const keymap = {
  [keymaps.splitListItem.common!]: (state, dispatch, view) =>
    composeTransforms(splitListItem(state.schema.nodes.list_item))(state, dispatch),
  [keymaps.findShortcutByKeymap(keymaps.toggleOrderedList)!]:
    trackAndInvoke('atlassian.editor.format.list.numbered.keyboard', (state, dispatch, view) => toggleOrderedList()(state, dispatch, view)),
  [keymaps.findShortcutByKeymap(keymaps.toggleBulletList)!]:
    trackAndInvoke('atlassian.editor.format.list.bullet.keyboard', (state, dispatch, view) => toggleBulletList()(state, dispatch, view))
};

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new ListsState(state);
    },
    apply(tr, pluginState: ListsState, oldState, newState) {
      pluginState.update(newState);
      return pluginState;
    }
  }
});

export default { keymap, plugin };

// TODO: Toggle multiple blocks (!!!)
// TODO: Adjust Selection (?)
// TODO: Tests
