import {
  TableMap,
  Node,
  Fragment,
  Schema
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
