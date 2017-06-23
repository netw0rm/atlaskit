import {
  EditorState,
  EditorView,
  Plugin,
  PluginKey,
  tableEditing,
  NodeViewDesc,
  CellSelection,
  TextSelection,
  Selection,
  TableMap,
  Node,
  Transaction,
  Fragment,
  Slice,
} from '../../prosemirror';
import keymapHandler from './keymap';
import * as tableBaseCommands from '../../prosemirror/prosemirror-tables';

export type TableStateSubscriber = (state: TableState) => any;

export interface Command {
  (state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;
}

export class TableState {
  keymapHandler: Function;
  cellElement?: HTMLElement;
  tableElement?: HTMLElement;
  editorFocused: boolean = false;
  tableNode?: Node;
  cellSelection?: CellSelection;
  toolbarFocused: boolean = false;
  tableHidden: boolean = false;
  tableDisabled: boolean = false;
  tableActive: boolean = false;

  private view: EditorView;
  private state: EditorState<any>;
  private changeHandlers: TableStateSubscriber[] = [];

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];
    this.state = state;

    const { table, table_cell, table_row, table_header } = state.schema.nodes;
    this.tableHidden = !table || !table_cell || !table_row || !table_header;
  }

  goToNextCell(direction: number): Command {
    return tableBaseCommands.goToNextCell(direction);
  }

  createTable (): Command {
    return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
      if (this.tableDisabled || this.tableElement) {
        return false;
      }
      this.focusEditor();
      const table = this.createStaticTable(3, 3);
      const tr = state.tr.replaceSelectionWith(table);
      tr.setSelection(Selection.near(tr.doc.resolve(state.selection.from)));
      dispatch(tr.scrollIntoView());
      return true;
    };
  }

  insertColumn = (column: number) => {
    if (this.tableNode) {
      const map = TableMap.get(this.tableNode);
      // last column
      if (column === map.width) {
        // to remove a cell we need to move the cursor to an appropriate cell first
        const prevColPos = map.positionAt(0, column - 1, this.tableNode);
        this.moveCursorTo(prevColPos);
        tableBaseCommands.addColumnAfter(this.view.state, this.view.dispatch);
        // then we move the cursor to the newly created cell
        const nextPos = TableMap.get(this.tableNode).positionAt(0, column, this.tableNode);
        this.moveCursorTo(nextPos);
      } else {
        const pos = map.positionAt(0, column, this.tableNode);
        this.moveCursorTo(pos);
        tableBaseCommands.addColumnBefore(this.view.state, this.view.dispatch);
        this.moveCursorTo(pos);
      }
    }
  }

  insertRow = (row: number) => {
    if (this.tableNode) {
      const map = TableMap.get(this.tableNode);
      // last row
      if (row === map.height) {
        const prevRowPos =  map.positionAt(row - 1, 0, this.tableNode);
        this.moveCursorTo(prevRowPos);
        tableBaseCommands.addRowAfter(this.view.state, this.view.dispatch);
        const nextPos = TableMap.get(this.tableNode).positionAt(row, 0, this.tableNode);
        this.moveCursorTo(nextPos);
      } else {
        const pos = map.positionAt(row, 0, this.tableNode);
        this.moveCursorTo(pos);
        tableBaseCommands.addRowBefore(this.view.state, this.view.dispatch);
        this.moveCursorTo(pos);
      }
    }
  }

  remove = () => {
    if (!this.cellSelection) {
      return;
    }
    if (this.cellSelection.isRowSelection()) {
      const removed = tableBaseCommands.deleteColumn(this.view.state, this.view.dispatch);
      // it's not going to be removed only if it attemps to remove the last cells in the table
      if (removed) {
        this.moveCursorToFirstCell();
      } else {
        tableBaseCommands.deleteTable(this.view.state, this.view.dispatch);
        this.focusEditor();
      }
    } else if (this.cellSelection.isColSelection()) {
      tableBaseCommands.deleteRow(this.view.state, this.view.dispatch);
      this.moveCursorToFirstCell();
    } else {
      // replace selected cells with empty cells
      this.emptySelectedCells();
      this.moveCursorInsideTableTo(this.state.selection.from);
    }
  }

  subscribe(cb: TableStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: TableStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  updateEditorFocused(editorFocused: boolean) {
    this.editorFocused = editorFocused;
  }

  updateToolbarFocused(toolbarFocused: boolean) {
    this.toolbarFocused = toolbarFocused;
  }

  selectColumn = (column: number) => {
    if (this.tableNode) {
      const map = TableMap.get(this.tableNode);
      const from = map.positionAt(0, column, this.tableNode);
      const to = map.positionAt(map.height - 1, column, this.tableNode);
      this.createCellSelection(from, to);
    }
  }

  selectRow = (row: number) => {
    if (this.tableNode) {
      const map = TableMap.get(this.tableNode);
      const from = map.positionAt(row, 0, this.tableNode);
      const to = map.positionAt(row, map.width - 1, this.tableNode);
      this.createCellSelection(from, to);
    }
  }

  selectTable = () => {
    if (this.tableNode) {
      const map = TableMap.get(this.tableNode);
      const from = map.positionAt(0, 0, this.tableNode);
      const to = map.positionAt(map.height - 1, map.width - 1, this.tableNode);
      this.createCellSelection(from, to);
    }
  }

  isColumnSelected = (column: number) => {
    if (this.tableNode && this.cellSelection) {
      const map = TableMap.get(this.tableNode);
      const start = this.cellSelection.$anchorCell.start(-1);
      const anchor = map.colCount(this.cellSelection.$anchorCell.pos - start);
      const head = map.colCount(this.cellSelection.$headCell.pos - start);
      return (
        this.cellSelection.isRowSelection() &&
        (column <= Math.max(anchor, head) && column >= Math.min(anchor, head))
      );
    }
    return false;
  }

  isRowSelected = (row: number) => {
    if (this.cellSelection) {
      const anchor = this.cellSelection.$anchorCell.index(-1);
      const head = this.cellSelection.$headCell.index(-1);
      return (
        this.cellSelection.isColSelection() &&
        (row <= Math.max(anchor, head) && row >= Math.min(anchor, head))
      );
    }
    return false;
  }

  isTableSelected = () => {
    if (this.cellSelection) {
      return this.cellSelection.isColSelection() && this.cellSelection.isRowSelection();
    }
    return false;
  }

  update(newEditorState: EditorState<any>, docView: NodeViewDesc) {
    this.state = newEditorState;
    let dirty = this.updateSelection();

    const tableElement = this.editorFocused ? this.getTableElement(docView) : undefined;
    if (tableElement !== this.tableElement) {
      this.tableElement = tableElement;
      dirty = true;
    }

    const tableNode = this.getTableNode();
    if (tableNode !== this.tableNode) {
      this.tableNode = tableNode;
      dirty = true;
    }

    const cellElement = this.cellSelection ? this.getFirstSelectedCellElement(docView) : undefined;
    if (cellElement !== this.cellElement) {
      this.cellElement = cellElement;
      dirty = true;
    }

    const tableActive = !!tableElement;
    if (tableActive !== this.tableActive) {
      this.tableActive = tableActive;
      dirty = true;
    }

    const tableDisabled = !this.canInsertTable();
    if (tableDisabled !== this.tableDisabled) {
      this.tableDisabled = tableDisabled;
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

  private getFirstSelectedCellElement(docView: NodeViewDesc): HTMLElement | undefined {
    const offset = this.firstSelectedCellStartPos();
    if (offset) {
      const { node } = docView.domFromPos(offset);
      if (node) {
        return node as HTMLElement;
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

  private firstSelectedCellStartPos(): number | undefined {
    if (!this.tableNode) {
      return;
    }
    const { $anchorCell, $headCell } = this.state.selection as CellSelection;
    const { table_cell, table_header } = this.state.schema.nodes;
    const map = TableMap.get(this.tableNode);
    const offset = this.tableStartPos() || 1;
    const start =  $anchorCell.start(-1);
    // array of selected cells positions
    const cells = map.cellsInRect(map.rectBetween($anchorCell.pos - start, $headCell.pos - start));
    // first selected cell position
    const firstCellPos = cells[0] + offset + 1;
    const $from = this.state.doc.resolve(firstCellPos);
    for (let i = $from.depth; i > 0; i--) {
      const node = $from.node(i);
      if(node.type === table_cell || node.type === table_header) {
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

  private createCellSelection (from, to): void {
    const { state } = this.view;
    // here "from" and "to" params are table-relative positions, therefore we add table offset
    const offset = this.tableStartPos() || 1;
    const $anchor = state.doc.resolve(from + offset);
    const $head = state.doc.resolve(to + offset);
    this.view.dispatch(
      this.view.state.tr.setSelection( new CellSelection($anchor, $head))
    );
  }

  // we keep track of selection changes because
  // 1) we want to mark toolbar buttons as active when the whole row/col is selected
  // 2) we want to drop selection if editor looses focus
  private updateSelection () {
    const { selection } = this.state;
    let dirty = false;

    if (selection instanceof CellSelection) {
      if (selection !== this.cellSelection) {
        this.cellSelection = selection;
        dirty = true;
      }

      // drop selection if editor looses focus
      if (!this.editorFocused) {
        const { state } = this.view;
        const { $from } = this.state.selection;
        this.view.dispatch(state.tr.setSelection(new TextSelection($from, $from)));
      }
    } else if (this.cellSelection) {
      this.cellSelection = undefined;
      dirty = true;
    }
    return dirty;
  }

  private createStaticTable (rows: number, columns: number) {
    const { state } = this.view;
    const { table, table_row, table_cell, table_header } = state.schema.nodes;
    const rowNodes: Node[] = [];

    for (let i = 0; i < rows; i ++) {
      const cell = i === 0 ? table_header : table_cell;
      const cellNodes: Node[] = [];
      for (let j = 0; j < columns; j ++) {
        cellNodes.push(cell.createAndFill());
      }
      rowNodes.push( table_row.create(null, Fragment.from(cellNodes)) );
    }
    return table.create(null, Fragment.from(rowNodes));
  }

  private canInsertTable (): boolean {
    const { $from, to } = this.state.selection;
    const { code } = this.state.schema.marks;
    for (let i = $from.depth; i > 0; i--) {
      const node = $from.node(i);
      // inline code and codeBlock are excluded
      if(node.type === this.state.schema.nodes.codeBlock || this.state.doc.rangeHasMark($from.pos, to, code)) {
        return false;
      }
    }
    return true;
  }

  private emptySelectedCells (): void {
    if (!this.cellSelection) {
      return;
    }

    const { tr, schema } = this.state;
    const emptyCell = schema.nodes.table_cell.createAndFill().content;
    this.cellSelection.forEachCell((cell, pos) => {
      if (!cell.content.eq(emptyCell)) {
        const slice = new Slice(emptyCell, 0, 0);
        tr.replace(tr.mapping.map(pos + 1), tr.mapping.map(pos + cell.nodeSize - 1), slice);
      }
    });
    if (tr.docChanged) {
      this.view.dispatch(tr);
    }
  }

  private focusEditor (): void {
    if (!this.view.hasFocus()) {
      this.view.focus();
    }
  }

  private moveCursorInsideTableTo (pos: number): void {
    this.focusEditor();
    const { tr } = this.state;
    tr.setSelection(Selection.near(tr.doc.resolve(pos)));
    this.view.dispatch(tr.scrollIntoView());
  }

  private moveCursorTo (pos: number): void {
    const offset = this.tableStartPos() || 1;
    this.moveCursorInsideTableTo(pos + offset);
  }

  private moveCursorToFirstCell (): void {
    if (this.tableNode) {
      const map = TableMap.get(this.tableNode);
      const pos =  map.positionAt(0, 0, this.tableNode);
      this.moveCursorTo(pos);
    }
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
  return [plugin, tableEditing()].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;

// https://github.com/ProseMirror/prosemirror/issues/432
setTimeout(() => {
  document.execCommand('enableObjectResizing', false, 'false');
  document.execCommand('enableInlineTableEditing', false, 'false');
});
