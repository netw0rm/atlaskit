import {
  canSplit,
  EditorView,
  findWrapping,
  Fragment,
  liftTarget,
  NodeRange,
  NodeSelection,
  NodeType,
  Plugin,
  ReplaceAroundStep,
  Slice
} from '../../prosemirror/future';
import {
  // canJoinDown,
  // canJoinUp,
  findAncestorPosition,
  // getAncestorNodesBetween,
  // getGroupsInRange,
  // isRangeOfType,
  // liftSelection,
} from '../../utils/index-future';

import {
  isBulletListNode,
  isOrderedListNode
} from '../../schema';

import * as keymaps from '../../keymaps';

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
    this.wrapInBulletList = !!bullet_list ? () => this.wrapInList(bullet_list, editorView, null, false) : noop;
    this.wrapInOrderedList = !!ordered_list ? () => this.wrapInList(ordered_list, editorView, null, false) : noop;

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

    this.toggleList(this.editorView.state.schema.nodes.bullet_list);
  }

  toggleOrderedList() {
    if (!this.editorView) {
      return;
    }

    this.toggleList(this.editorView.state.schema.nodes.ordered_list);
  }

  toggleList(nodeType: NodeType) {
    const view = this.editorView;

    if (!view) {
      return;
    }

    const selection = view.state.selection;
    const ancestorPosition = findAncestorPosition(view.state.doc, selection.$from);
    const rootNode = selection instanceof NodeSelection
      ? selection.node
      : ancestorPosition.node(ancestorPosition.depth)!;

    if (rootNode.type === nodeType) {
      return liftListItem(view.state, view.dispatch, view, view.state.schema.nodes.list_item);
    }

    return this.wrapInList(nodeType, view);
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


    // TODO: After removeing list buttons disables till next key press.
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

  private wrapInList(nodeType: NodeType, view: EditorView, attrs?, apply: boolean = true) {
    return wrapInList(view.state, apply ? view.dispatch : noop, view, nodeType);
  }
}

function splitListItem(editorState, dispatch, editorView, nodeType) {
  const {$from, $to, node} = editorState.selection;

  if ((node && node.isBlock) || !$from.parent.content.size || $from.depth < 2 || !$from.sameParent($to)) {
    return false;
  }

  const grandParent = $from.node(-1);
  if (grandParent.type !== nodeType) {
    return false;
  }

  const nextType = $to.pos === $from.end() ? grandParent.defaultContentType($from.indexAfter(-1)) : null;
  const tr = editorState.tr.delete($from.pos, $to.pos);
  const types = nextType && [null, {type: nextType}];

  if (!canSplit(tr.doc, $from.pos, 2)) {
    return false;
  }

  if (dispatch) {
      dispatch(tr.split($from.pos, 2, types).scrollIntoView());
  }

  return true;
}

function wrapInList(state, dispatch, view, nodeType, attrs?) {
  const {$from, $to} = state.selection;
  let range = $from.blockRange($to);
  let doJoin = false;
  let outerRange = range;

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

  const wrap = findWrapping(outerRange, nodeType, attrs, range);

  if (!wrap) {
    return false;
  }

  if (dispatch) {
    dispatch(doWrapInList(state.tr, range, wrap, doJoin, nodeType).scrollIntoView());
  }

  return true;
}

function doWrapInList(tr, range, wrappers, joinBefore, nodeType) {
  let content = Fragment.empty;
  for (let i = wrappers.length - 1; i >= 0; i--) {
    content = Fragment.from(wrappers[i].type.create(wrappers[i].attrs, content));
  }

  tr.step(new ReplaceAroundStep(range.start - (joinBefore ? 2 : 0), range.end, range.start, range.end,
                                new Slice(content, 0, 0), wrappers.length, true));

  let found = 0;
  for (let i = 0; i < wrappers.length; i++) {
    if (wrappers[i].type === nodeType) {
      found = i + 1;
    }
  }

  const parent = range.parent;
  const splitDepth = wrappers.length - found;
  let splitPos = range.start + wrappers.length - (joinBefore ? 2 : 0);
  const e = range.endIndex;

  for (let i = range.startIndex, first = true; i < e; i++, first = false) {
    if (!first && canSplit(tr.doc, splitPos, splitDepth)) {
      tr.split(splitPos, splitDepth);
    }

    splitPos += parent.child(i).nodeSize + (first ? 0 : 2 * splitDepth);
  }
  return tr;
}

function liftListItem(state, dispatch, view, nodeType) {
  const {$from, $to} = state.selection;
  let range = $from.blockRange($to, node => node.childCount && node.firstChild.type === nodeType);

  if (!range || range.depth < 2 || $from.node(range.depth - 1).type !== nodeType) {
    return false;
  }

  if (dispatch) {
    const tr = state.tr;
    const end = range.end;
    const endOfList = $to.end(range.depth);

    if (end < endOfList) {
      // There are siblings after the lifted items, which must become
      // children of the last item
      tr.step(new ReplaceAroundStep(end - 1, endOfList, end, endOfList,
                                    new Slice(Fragment.from(nodeType.create(null, range.parent.copy())), 1, 0), 1, true));
      range = new NodeRange(tr.doc.resolveNoCache($from.pos), tr.doc.resolveNoCache(endOfList), range.depth);
    }

    dispatch(tr.lift(range, liftTarget(range)).scrollIntoView());
  }

  return true;
}

const commands = { splitListItem, wrapInList };

const keymap = {
  [keymaps.splitListItem.common!]: (state, dispatch, view) => {
    return splitListItem(state, dispatch, view, state.schema.nodes.list_item);
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
