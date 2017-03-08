import {
  EditorState,
  EditorView,
  findWrapping,
  NodeSelection,
  Plugin,
} from '../../prosemirror';
import {
  findAncestorPosition,
} from '../../utils/index-future';

import { bind as bindKeymap } from '../keymaps/build-keymaps';
import * as keymaps from '../keymaps/utils-future';
import * as commands from '../../commands';

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

  toggleBulletList(view: EditorView) {
    commands.toggleBulletList()(view.state, view.dispatch);
  }

  toggleOrderedList(view: EditorView) {
    commands.toggleOrderedList()(view.state, view.dispatch);
  }

  update(newEditorState) {
    const { doc, selection } = newEditorState;
    const ancestorPosition = findAncestorPosition(doc, selection.$from);
    const rootNode = selection instanceof NodeSelection
      ? selection.node
      : ancestorPosition.node(ancestorPosition.depth) !;

    let dirty = false;

    const newBulletListActive = rootNode.type === newEditorState.schema.nodes.bullet_list;
    if (newBulletListActive !== this.bulletListActive) {
      this.bulletListActive = newBulletListActive;
      dirty = true;
    }

    const newOrderedListActive = rootNode.type === newEditorState.schema.nodes.ordered_list;
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

  private isWrappingPossible(nodeType, state) {
    const {$from, $to} = state.selection;
    const range = $from.blockRange($to);

    if (!range) { return false; }

    const wrap = findWrapping(range, nodeType);

    if (!wrap) { return false; }

    return true;
  }
};

bindKeymap([keymaps.splitListItem.common!], commands.splitListItem());
bindKeymap([keymaps.findShortcutByKeymap(keymaps.toggleOrderedList) !], commands.toggleOrderedList());
bindKeymap([keymaps.findShortcutByKeymap(keymaps.toggleBulletList) !], commands.toggleBulletList());

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

export default plugin;

// TODO: Toggle multiple blocks (!!!)
// TODO: Adjust Selection (?)
// TODO: Tests
