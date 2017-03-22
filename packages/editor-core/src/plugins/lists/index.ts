import {
  EditorState,
  EditorView,
  findWrapping,
  NodeSelection,
  Plugin,
  PluginKey,
} from '../../prosemirror';
import {
  findAncestorPosition,
} from '../../utils';

import * as commands from '../../commands';
import keymapPlugin from './keymap';
import inputRulePlugin from './input-rule';
import { reconfigure } from '../utils';

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
    const { bulletList, orderedList } = state.schema.nodes;
    this.bulletListHidden = !bulletList;
    this.orderedListHidden = !orderedList;
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  toggleBulletList(view: EditorView) {
    commands.toggleBulletList()(view.state, view.dispatch, view);
  }

  toggleOrderedList(view: EditorView) {
    commands.toggleOrderedList()(view.state, view.dispatch, view);
  }

  update(newEditorState) {
    const { doc, selection } = newEditorState;
    const ancestorPosition = findAncestorPosition(doc, selection.$from);
    const rootNode = selection instanceof NodeSelection
      ? selection.node
      : ancestorPosition.node(ancestorPosition.depth) !;

    let dirty = false;

    const newBulletListActive = rootNode.type === newEditorState.schema.nodes.bulletList;
    if (newBulletListActive !== this.bulletListActive) {
      this.bulletListActive = newBulletListActive;
      dirty = true;
    }

    const newOrderedListActive = rootNode.type === newEditorState.schema.nodes.orderedList;
    if (newOrderedListActive !== this.orderedListActive) {
      this.orderedListActive = newOrderedListActive;
      dirty = true;
    }

    const anyListActive = newBulletListActive || newOrderedListActive;

    const newBulletListDisabled = !(anyListActive || this.isWrappingPossible(newEditorState.schema.nodes.bulletList, newEditorState));
    if (newBulletListDisabled !== this.bulletListDisabled) {
      this.bulletListDisabled = newBulletListDisabled;
      dirty = true;
    }

    const newOrderedListDisabled = !(anyListActive || this.isWrappingPossible(newEditorState.schema.nodes.orderedList, newEditorState));
    if (newOrderedListDisabled !== this.orderedListDisabled) {
      this.orderedListDisabled = newOrderedListDisabled;
      dirty = true;
    }

    if (dirty) {
      this.triggerOnChange();
    }
  }

  private triggerOnChange() {
    this.changeHandlers.forEach(cb => cb(this));
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

export const stateKey = new PluginKey('listsPlugin');

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new ListsState(state);
    },
    apply(tr, pluginState: ListsState, oldState, newState) {
      pluginState.update(newState);
      return pluginState;
    }
  },
  key: stateKey,
  view: (view: EditorView) => {
    reconfigure(view, [keymapPlugin(view.state.schema), inputRulePlugin(view.state.schema)]);
    return {};
  }
});

export default plugin;
