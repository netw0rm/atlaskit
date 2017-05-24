import React, { PropTypes } from 'react';
import { TableBodyRow, TableBodyCell } from '../styled/TableRow';
import props from '../internal/props';

const Row = ({ row, rowIndex, head, isFixedSize }) => {
  const { cells, ...restRowProps } = row;

  return (
    <TableBodyRow key={rowIndex} {...restRowProps}>
      {
        cells.map((cell, cellIndex) => {
          const { content, ...restCellProps } = cell;
          const { shouldTruncate, width } = (head || { cells: [] }).cells[cellIndex] || {};

          return (
            <TableBodyCell
              {...restCellProps}
              key={cellIndex}
              width={width}
              shouldTruncate={shouldTruncate}
              isFixedSize={isFixedSize}
            >
              {content}
            </TableBodyCell>
          );
        })
      }
    </TableBodyRow>
  );
};

Row.propTypes = {
  row: props.row,
  rowIndex: PropTypes.number,
  head: props.head,
  isFixedSize: PropTypes.bool,
};

export default Row;
