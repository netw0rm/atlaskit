import PropTypes from 'prop-types';
import React from 'react';
import { ASC, DESC } from '../internal/constants';
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

const Body = ({ rows, head, sortKey, sortOrder, rowsPerPage, page, isFixedSize }) => {
  const sortedRows = getSortedRows(head, rows, sortKey, sortOrder) || [];

  return (
    <tbody>
      {sortedRows
        .slice((page - 1) * rowsPerPage, page * rowsPerPage)
        .map((row, rowIndex) => (
          <TableRow
            head={head}
            isFixedSize={isFixedSize}
            key={rowIndex}
            row={row}
          />
        ))}
    </tbody>
  );
};

Body.propTypes = {
  head: props.head,
  isFixedSize: PropTypes.bool,
  page: props.isInteger,
  rows: props.rows,
  rowsPerPage: props.isInteger,
  sortKey: props.sortKey,
  sortOrder: PropTypes.oneOf([ASC, DESC]),
};

export default Body;
