import {
  EditorState,
  EditorView,
  Plugin,
  PluginKey,
  tableEditing,
  Transaction,
  NodeViewDesc,
} from '../../prosemirror';
import * as tableCommands from '../../prosemirror/prosemirror-tables';
import keymapHandler from './keymap';

export type TableStateSubscriber = (state: TableState) => any;

export interface TablesCommand {
  (state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;
}

export class TableState {
  keymapHandler;
  element?: HTMLElement;
  domEvent: boolean = false;
  editorFocused: boolean = false;
  tableNode?: Node;

  private state: EditorState<any>;
  private changeHandlers: TableStateSubscriber[] = [];

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];
    this.state = state;
  }

  subscribe(cb: TableStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: TableStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  goToNextCell (direction: number): TablesCommand {
    return tableCommands.goToNextCell(direction);
  }

  updateEditorFocused(editorFocused: boolean) {
    this.editorFocused = editorFocused;
    this.triggerOnChange();
  }

  update(newEditorState: EditorState<any>, docView: NodeViewDesc) {
    this.state = newEditorState;

    const tableNode = this.getTableNode();
    if (tableNode) {
      this.element = this.activeElement(docView);
    }

    if (tableNode !== this.tableNode) {
      this.tableNode = tableNode;
      this.triggerOnChange();
    }
  }

  private activeElement(docView: NodeViewDesc): HTMLElement {
    const offset = this.nodeStartPos();
    const { node } = docView.domFromPos(offset);
    return node as HTMLElement;
  }

  private nodeStartPos(): number {
    const { $from } = this.state.selection;
    return $from.start($from.depth);
  }

  private getTableNode(): Node | undefined {
    const { state } = this;
    const { path } = state.selection.$from;
    if (!Array.isArray(path) || !path.length) {
      return;
    }
    let node;
    let i = path.length;
    while (i--) {
      if (path[i] && path[i].type === state.schema.nodes.table) {
        node = path[i];
        break;
      }
    }

    if (node) {
      return node;
    }
  }

  private triggerOnChange() {
    this.changeHandlers.forEach(cb => cb(this));
  }
}

export const stateKey = new PluginKey('tablePlugin');

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new TableState(state);
    },
    apply(tr, pluginState: TableState, oldState, newState) {
      const stored = tr.getMeta(stateKey);
      if (stored) {
        pluginState.update(newState, stored.docView);
      }
      return pluginState;
    }
  },
  key: stateKey,
  view: (editorView: EditorView) => {
    const pluginState = stateKey.getState(editorView.state);
    pluginState.update(editorView.state, editorView.docView);
    pluginState.keymapHandler = keymapHandler(pluginState);

    return {
      update: (view: EditorView, prevState: EditorState<any>) => {
        stateKey.getState(view.state).update(view.state, view.docView);
      }
    };
  },
  props: {
    handleKeyDown(view, event) {
      return stateKey.getState(view.state).keymapHandler(view, event);
    },
    handleClick(view: EditorView, event) {
      stateKey.getState(view.state).update(view.state, view.docView);
      return false;
    },
    onFocus(view: EditorView, event) {
      stateKey.getState(view.state).updateEditorFocused(true);
    },
    onBlur(view: EditorView, event) {
      const pluginState = stateKey.getState(view.state);
      pluginState.updateEditorFocused(false);
    },
  }
});

const plugins = () => {
  return [tableEditing(), plugin].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
