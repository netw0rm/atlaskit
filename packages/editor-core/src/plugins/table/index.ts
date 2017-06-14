import {
  EditorState,
  EditorView,
  Plugin,
  PluginKey,
  tableEditing,
  Transaction,
  NodeViewDesc,
  CellSelection,
  TextSelection,
  TableMap,
  Node,
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
  tableElement?: HTMLElement;
  editorFocused: boolean = false;
  tableNode?: Node;
  selection?: CellSelection;
  toolbarFocused: boolean = false;

  private view: EditorView;
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

  goToNextCell(direction: number): TablesCommand {
    return tableCommands.goToNextCell(direction);
  }

  updateEditorFocused(editorFocused: boolean) {
    this.editorFocused = editorFocused;
  }

  updateToolbarFocused(toolbarFocused: boolean) {
    this.toolbarFocused = toolbarFocused;
  }

  selectCol = (col: number) => {
    if (!this.tableNode) {
      return;
    }
    const { state } = this.view;
    const map = TableMap.get(this.tableNode);
    const offset = this.tableStartPos() || 1;
    const $anchor = state.doc.resolve(map.positionAt(0, col, this.tableNode) + offset);
    const $head = state.doc.resolve(map.positionAt(map.height - 1, col, this.tableNode) + offset);
    this.view.dispatch(this.view.state.tr.setSelection( new CellSelection( $anchor, $head ) ));
  }

  selectRow = (row: number) => {
    if (!this.tableNode) {
      return;
    }
    const { state } = this.view;
    const map = TableMap.get(this.tableNode);
    const offset = this.tableStartPos() || 1;
    const $anchor = state.doc.resolve(map.positionAt(row, 0, this.tableNode) + offset);
    const $head = state.doc.resolve(map.positionAt(row, map.width - 1, this.tableNode) + offset);
    this.view.dispatch(this.view.state.tr.setSelection( new CellSelection( $anchor, $head ) ));
  }

  selectTable = () => {
    if (!this.tableNode) {
      return;
    }
    const { state } = this.view;
    const map = TableMap.get(this.tableNode);
    const offset = this.tableStartPos() || 1;
    const $anchor = state.doc.resolve(map.positionAt(0, 0, this.tableNode) + offset);
    const $head = state.doc.resolve(map.positionAt(map.height - 1, map.width - 1, this.tableNode) + offset);
    this.view.dispatch(this.view.state.tr.setSelection( new CellSelection( $anchor, $head ) ));
  }

  update(newEditorState: EditorState<any>, docView: NodeViewDesc) {
    this.state = newEditorState;
    let dirty = false;

    const tableElement = this.editorFocused ? this.getTableElement(docView) : undefined;
    const tableNode = this.getTableNode();
    const { selection } = this.state;

    if (selection instanceof CellSelection) {
      if (selection !== this.selection) {
        this.selection = selection;
        dirty = true;
      }

      // remove selection if editor looses focus
      if (!this.editorFocused) {
        const { state } = this.view;
        const { $from } = this.state.selection;
        this.view.dispatch(state.tr.setSelection(new TextSelection($from, $from)));
      }
    } else if (this.selection) {
      this.selection = undefined;
      dirty = true;
    }

    if (tableElement !== this.tableElement) {
      this.tableElement = tableElement;
      dirty = true;
    }

    if (tableNode !== this.tableNode) {
      this.tableNode = tableNode;
      dirty = true;
    }

    if (dirty) {
      this.triggerOnChange();
    }
  }

  setView(view: EditorView) {
    this.view = view;
  }

  private getTableElement(docView: NodeViewDesc): HTMLElement | undefined {
    const offset = this.tableStartPos();
    if (offset) {
      const { node } = docView.domFromPos(offset);
      if (node) {
        return node.parentNode as HTMLElement;
      }
    }
  }

  private tableStartPos(): number | undefined {
    const { $from } = this.state.selection;
    for (let i = $from.depth; i > 0; i--) {
      const node = $from.node(i);
      if(node.type === this.state.schema.nodes.table) {
        return $from.start(i);
      }
    }
  }

  private getTableNode(): Node | undefined {
    const { $from } = this.state.selection;
    for (let i = $from.depth; i > 0; i--) {
      const node = $from.node(i);
      if(node.type === this.state.schema.nodes.table) {
        return node;
      }
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
    pluginState.setView(editorView);

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
      if (pluginState.toolbarFocused) {
        pluginState.updateToolbarFocused(false);
      } else {
        pluginState.updateEditorFocused(false);
        pluginState.update(view.state, view.docView);
      }
    },
  }
});

const plugins = () => {
  return [tableEditing(), plugin].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;

// https://github.com/ProseMirror/prosemirror/issues/432
setTimeout(() => {
  document.execCommand('enableObjectResizing', false, 'false');
  document.execCommand('enableInlineTableEditing', false, 'false');
});
