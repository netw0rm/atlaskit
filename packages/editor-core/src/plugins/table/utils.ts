import {
  TableMap,
  Node,
  Fragment,
  Schema,
  EditorState,
  CellSelection
} from '../../prosemirror';

export interface TableRelativePosition {
  from: number;
  to: number;
}

export const getColumnPos = (column, tableNode: Node): TableRelativePosition => {
  const map = TableMap.get(tableNode);
  const from = map.positionAt(0, column, tableNode);
  const to = map.positionAt(map.height - 1, column, tableNode);
  return {from, to};
};

export const getRowPos = (row, tableNode: Node): TableRelativePosition => {
  const map = TableMap.get(tableNode);
  const from = map.positionAt(row, 0, tableNode);
  const to = map.positionAt(row, map.width - 1, tableNode);
  return {from, to};
};

export const getTablePos = (tableNode: Node): TableRelativePosition => {
  const map = TableMap.get(tableNode);
  const from = map.positionAt(0, 0, tableNode);
  const to = map.positionAt(map.height - 1, map.width - 1, tableNode);
  return {from, to};
};

export const createTableNode = (rows: number, columns: number, schema: Schema<any, any>): Node => {
  const { table, tableRow, tableCell, tableHeader } = schema.nodes;
  const rowNodes: Node[] = [];

  for (let i = 0; i < rows; i ++) {
    const cell = i === 0 ? tableHeader : tableCell;
    const cellNodes: Node[] = [];
    for (let j = 0; j < columns; j ++) {
      cellNodes.push(cell.createAndFill());
    }
    rowNodes.push(tableRow.create(null, Fragment.from(cellNodes)));
  }
  return table.create(null, Fragment.from(rowNodes));
};

export const isIsolating = (node: Node): boolean => {
  return !!node.type.spec.isolating;
};

export interface SelectedCells {
  anchor: number;
  head: number;
}

export const getSelectedColumn = (state: EditorState<any>, map: TableMap): SelectedCells => {
  const { $anchorCell, $headCell } = state.selection as CellSelection;
  const start = $anchorCell.start(-1);
  const anchor = map.colCount($anchorCell.pos - start);
  const head = map.colCount($headCell.pos - start);
  return { anchor, head };
};

export const getSelectedRow = (state: EditorState<any>): SelectedCells => {
  const { $anchorCell, $headCell } = state.selection as CellSelection;
  const anchor = $anchorCell.index(-1);
  const head = $headCell.index(-1);

  return { anchor, head };
};
