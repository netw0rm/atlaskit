import {
  canSplit,
  EditorState,
  EditorView,
  findWrapping,
  Fragment,
  joinDown,
  joinUp,
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
  Transaction,
  TextSelection,
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
    const { bullet_list, ordered_list } = editorView.state.schema.nodes;
    this.bulletListHidden = !bullet_list;
    this.orderedListHidden = !ordered_list;
    this.wrapInBulletList = !!bullet_list ? () => wrapInList(bullet_list)(editorView.state, noop, editorView) : noop;
    this.wrapInOrderedList = !!ordered_list ? () => wrapInList(ordered_list)(editorView.state, noop, editorView) : noop;

    this.update(editorView.state);
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


    // TODO: After removing list buttons disables till next key press.
    const newBulletListDisabled = !(anyListActive || this.wrapInBulletList());
    if (newBulletListDisabled !== this.bulletListDisabled) {
      this.bulletListDisabled = newBulletListDisabled;
      dirty = true;
    }

    const newOrderedListDisabled = !(anyListActive || this.wrapInOrderedList());
    if (newOrderedListDisabled !== this.orderedListDisabled) {
      this.orderedListDisabled = newOrderedListDisabled;
      dirty = true;
    }

    if (dirty) {
      this.triggerOnChange();
    }
  }
}

// Build a command that splits a non-empty textblock at the top level
// of a list item by also splitting that list item.
const splitListItem = (nodeType: NodeType) => (state: EditorState<any>, dispatch, view: EditorView): boolean => {
  const {$from, $to, node} = state.selection as NodeSelection;
  if ((node && node.isBlock) || !($from.parent.content as any).size || $from.depth < 2 || !$from.sameParent($to)) {
    return false;
  }
  const grandParent = $from.node(-1);

  if (grandParent.type !== nodeType) {
    return false;
  }

  const nextType = $to.pos === $from.end() ? (grandParent as any).defaultContentType($from.indexAfter(-1)) : null;
  const tr = (state.tr as any).delete($from.pos, $to.pos);
  const types = nextType && [null, {type: nextType}];

  if (!canSplit(tr.doc, $from.pos, 2)) {
    return false;
  }

  if (dispatch) {
    dispatch(tr.split($from.pos, 2, types).scrollIntoView())
  }

  return true;
};

// Returns a command function that wraps the selection in a list with
// the given type an attributes. If `dispatch` is `false`, only return
// a value to indicate whether this is possible, but don't actually
// perform the change.
const wrapInList = (nodeType: NodeType, attrs?) => (state: EditorState<any>, dispatch, view?: EditorView): boolean => {
  const { tr } = state;
  const { $from, $to } = state.selection;
  let range = $from.blockRange($to);
  let doJoin = false;
  let outerRange;

  if (!range) {
    return false;
  }

  // This is at the top of an existing list item
  if (range.depth >= 2 && $from.node(range.depth - 1).type.compatibleContent(nodeType) && range.startIndex === 0) {
    // Don't do anything if this is the top of the list
    if ($from.index(range.depth - 1) === 0) {
      return false;
    }

    const $insert = state.doc.resolve(range.start - 2);
    outerRange = new NodeRange($insert, $insert, range.depth);

    if (range.endIndex < range.parent.childCount) {
      range = new NodeRange($from, state.doc.resolve($to.end(range.depth)), range.depth);
    }

    doJoin = true;
  }

  const wrap = findWrapping(outerRange || range, nodeType, attrs, range);

  if (!wrap) {
    return false;
  }

  // Wraps whole selection in a list
  const content = wrap
    .reduceRight((acc, item) => Fragment.from(item.type.create(item.attrs, acc)), Fragment.empty);

  tr.step(new ReplaceAroundStep(range.start - (doJoin ? 2 : 0), range.end, range.start, range.end,
                                new Slice(content, 0, 0), wrap.length, true));

  /**
   * Splits list into list items for example if we have selection like this:
   *
   *  doc
   *  <{p text
   *    p text
   *    p text
   *    p text }>
   *
   * After first step where we wrap everything in a list we will have:
   *
   *  doc
   *  <{ul
   *      li
   *        p text
   *        p text
   *        p text
   *        p text }>
   *
   * After splitting step we will have structure like this:
   *
   * doc
   *  <{ul
   *      li
   *        p text
   *      li
   *        p text
   *      li
   *        p text
   *      li
   *        p text }>
   */

  const found = wrap.reduce((acc, item, index) => item.type === nodeType ? (acc = index + 1) : acc, 0);
  const parent = range.parent;
  const splitDepth = wrap.length - found;
  let splitPos = range.start + wrap.length - (doJoin ? 2 : 0);

  for (let i = range.startIndex, first = true; i < range.endIndex; i++, first = false) {
    if (!first && canSplit(tr.doc, splitPos, splitDepth)) {
      (tr as any).split(splitPos, splitDepth);
    }

    splitPos += parent.child(i).nodeSize + (first ? 0 : 2 * splitDepth);
  }

  if (dispatch) {
    dispatch(tr.scrollIntoView());
  }

  return true;
};

const toggleList = (nodeType: NodeType) => (state: EditorState<any>, dispatch?, view?: EditorView) => {
  return wrapInList(nodeType)(state, dispatch, view);
};

const untoggleList = (nodeType: NodeType) => (state: EditorState<any>, dispatch?, view?: EditorView) => {
  return lift(state, dispatch);
};

const toggleBulletList = (pluginState?) => (state: EditorState<any>, dispatch, view: EditorView) =>
  pluginState && pluginState.bulletListActive
  ? untoggleList(state.schema.nodes.bullet_list)(state, dispatch, view)
  : toggleList(state.schema.nodes.bullet_list)(state, dispatch, view);

const toggleOrderedList = (pluginState?) => (state: EditorState<any>, dispatch, view: EditorView) =>
  toggleList(state.schema.nodes.ordered_list)(state, dispatch, view);

const commands = { splitListItem, wrapInList, toggleBulletList, toggleOrderedList };

const keymap = {
  [keymaps.splitListItem.common!]: (state, dispatch, view) => {
    return splitListItem(state.schema.nodes.list_item)(state, dispatch, view);
  },
  // [keymaps.toggleOrderedList.common!]: trackAndInvoke('atlassian.editor.format.list.numbered.keyboard', () => this.toggleOrderedList()),
  // [keymaps.toggleBulletList.common!]: trackAndInvoke('atlassian.editor.format.list.bullet.keyboard', () => this.toggleBulletList())
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

export default { commands, keymap, plugin };
