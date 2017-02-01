import {
  canJoin,
  canSplit,
  EditorState,
  EditorView,
  findWrapping,
  Fragment,
  joinPoint,
  lift,
  liftTarget,
  Node,
  NodeRange,
  NodeSelection,
  NodeType,
  Plugin,
  ReplaceAroundStep,
  ResolvedPos,
  Slice,
  TextSelection,
  Transaction,
  Transform,
} from '../../prosemirror/future';
import {
  canJoinDown,
  canJoinUp,
  findAncestorPosition,
  getAncestorNodesBetween,
  getGroupsInRange,
  isRangeOfType,
  liftSelection,
} from '../../utils/index-future';

import {
  isBulletListNode,
  isOrderedListNode
} from '../../schema';

import * as keymaps from '../keymaps';

export type StateChangeHandler = (state: ListsState) => any;

const noop = (...args: any[]) => {};

/**
 *
 * Plugin State
 *
 */
export class ListsState {
  private changeHandlers: StateChangeHandler[] = [];
  private editorView: EditorView | undefined;
  private wrapInBulletList: () => any;
  private wrapInOrderedList: () => any;

  // public state
  bulletListActive = false;
  bulletListDisabled = false;
  bulletListHidden = false;
  orderedListActive = false;
  orderedListDisabled = false;
  orderedListHidden = false;

  constructor() {
    this.changeHandlers = [];
  }

  setView(editorView: EditorView) {
    this.editorView = editorView;

    // Checks what types of lists schema supports.
    const { bullet_list, ordered_list } = this.editorView.state.schema.nodes;
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

  toggleBulletList() {
    if (!this.editorView) {
      return;
    }

    toggleBulletList(this)(this.editorView.state, this.editorView.dispatch, this.editorView);
  }

  toggleOrderedList() {
    if (!this.editorView) {
      return;
    }

    toggleOrderedList(this)(this.editorView.state, this.editorView.dispatch, this.editorView);
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

    if (dirty) {
      this.triggerOnChange();
    }
  }
};

/**
 *
 * Utils
 *
 */

/**
 * Wraps selection in list according to nodeType (Bullet List | Ordered List)
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
      (tr as any).split(splitPos, splitDepth); // TODO: fix types for transaction
    }

    splitPos += parent.child(i).nodeSize + (first ? 0 : 2 * splitDepth);
  }

  return tr;
};

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

  const nextType = $to.pos === $from.end() ? (grandParent as any).defaultContentType($from.indexAfter(-1)) : null;
  const types = nextType && [null, {type: nextType}];

  (state.tr as any).delete($from.pos, $to.pos);

  if (!canSplit(tr.doc, $from.pos, 2)) {
    return;
  }

  return (tr as any).split($from.pos, 2, types).scrollIntoView(); // TODO: fix types for transaction
};

const liftListItems = () => (state: EditorState<any>, transaction?: Transaction) => {
  const tr = transaction || state.tr;
  const {$from, $to} = tr.selection;
  return liftSelection(tr, tr.doc, $from, $to);
};

const joinUp = (nodeType: NodeType) => (state: EditorState<any>, transaction?: Transaction) => {
  const tr = transaction || state.tr;

  if (canJoinUp(tr.selection, tr.doc, nodeType)) {
    const res = tr.doc.resolve(tr.selection.$from.before(findAncestorPosition(tr.doc, tr.selection.$from).depth));
    const point = joinPoint(tr.doc, res.pos, -1);
    if (point) {
      (tr as any).join(point); // TODO: fix types for transaction
    }
  }

  return tr;
};

const joinDown = (nodeType: NodeType) => (state: EditorState<any>, transaction?: Transaction) => {
  const tr = transaction || state.tr;

  if (canJoinDown(tr.selection, tr.doc, nodeType)) {
    const res = tr.doc.resolve(tr.selection.$to.after(findAncestorPosition(tr.doc, tr.selection.$to).depth));
    const point = joinPoint(tr.doc, res.pos, 1);
    if (point) {
      (tr as any).join(point); // TODO: fix types for transaction
    }
  }

  return tr;
};


/**
 *
 * Commands
 *
 */

const composeCommands = (...args) => (state, dispatch) => {
  const tr = args.reduce((tr, command) => command(state, tr), undefined);

  if (dispatch && tr) {
    dispatch(tr);
    return true;
  }

  return false;
};

const toggleBulletList = (pluginState: ListsState) => (state: EditorState<any>, dispatch?, view?: EditorView) => {
  if (!view) {
    return;
  }

  if (pluginState.bulletListActive) {
    return composeCommands(liftListItems())(view.state, view.dispatch);
  }

  if (pluginState.orderedListActive) {
    composeCommands(liftListItems())(view.state, view.dispatch);
  }

  return composeCommands(
    wrapSelectionInList(state.schema.nodes.bullet_list),
    splitListItemWithMultipleBlocks(state.schema.nodes.bullet_list),
    joinUp(state.schema.nodes.bullet_list),
    joinDown(state.schema.nodes.bullet_list)
  )(view.state, view.dispatch);
};

const toggleOrderedList = (pluginState: ListsState) => (state: EditorState<any>, dispatch?, view?: EditorView) => {
  if (!view) {
    return;
  }

  if (pluginState.orderedListActive) {
    return composeCommands(liftListItems())(view.state, view.dispatch);
  }

  if (pluginState.bulletListActive) {
    composeCommands(liftListItems())(view.state, view.dispatch);
  }

  return composeCommands(
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
    composeCommands(splitListItem(state.schema.nodes.list_item))(state, dispatch)
};

const plugin = new Plugin({
  state: {
    init() {
      return new ListsState();
    },
    apply(tr, pluginState: ListsState, oldState, newState) {
      pluginState.update(newState);
      return pluginState;
    }
  }
});

export default { keymap, plugin };
