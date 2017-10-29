import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { ASC, DESC } from '../internal/constants';
import { getPageRows } from '../internal/helpers';
import TableRow from './TableRow';
import props from '../internal/props';

const getSortedRows = (head, rows, sortKey, sortOrder) => {
  if (!sortKey || !head) return rows;

  const getSortingCellValue = cells =>
    cells.reduce((result, cell, index) => result || (
      (head.cells[index].key === sortKey) &&
      (cell.key !== undefined ? cell.key : cell.content)
    ), null);

  return rows.sort((a, b) => {
    const valA = getSortingCellValue(a.cells);
    const valB = getSortingCellValue(b.cells);

    const modifier = sortOrder === ASC ? 1 : -1;

    if (!valA || valA < valB) return -modifier;
    if (!valB || valA > valB) return modifier;
    return 0;
  });
};

export default class Body extends PureComponent {
  static propTypes = {
    head: props.head,
    isFixedSize: PropTypes.bool,
    page: props.isInteger,
    rows: props.rows,
    rowsPerPage: props.isInteger,
    sortKey: props.sortKey,
    sortOrder: PropTypes.oneOf([ASC, DESC]),
  };

  render() {
    const {
      rows,
      head,
      sortKey,
      sortOrder,
      rowsPerPage,
      page,
      isFixedSize,
    } = this.props;

    const sortedRows = getSortedRows(head, rows, sortKey, sortOrder) || [];
    const pageRows = getPageRows(page, sortedRows, rowsPerPage);

    return (
      <tbody>
        {pageRows.map((row, rowIndex) => (
          <TableRow
            head={head}
            isFixedSize={isFixedSize}
            key={rowIndex}
            row={row}
          />
        ))}
      </tbody>
    );
  }
}
