import React, { Component } from 'react';
import { Pagination } from '@atlaskit/pagination';
import omit from 'lodash.omit';

import { ASC, DESC } from './internal/constants';
import { statelessPropTypes, statelessDefaultProps } from './internal/props';

import { Table, Caption, TableHead, TableHeadCell, TableBodyRow, TableBodyCell } from './styled';

function toggleSortOrder(currentSortOrder) {
  switch (currentSortOrder) {
    case DESC:
      return ASC;
    case ASC:
      return DESC;
    default:
      return currentSortOrder;
  }
}

export default class DynamicTable extends Component {
  static propTypes = statelessPropTypes

  static defaultProps = statelessDefaultProps

  onSort = item => () => {
    const { key } = item;
    if (!key) return;
    const sortOrder = key !== this.props.sortKey ? ASC : toggleSortOrder(this.props.sortOrder);
    this.onSetPage(1);
    this.props.onSort({ key, item, sortOrder });
  }

  onSetPage = page => this.props.onSetPage(page);

  getSortedRows() {
    const { head, rows, sortKey, sortOrder } = this.props;
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
  }

  renderCaption() {
    const { caption } = this.props;
    if (!caption) return null;
    return <Caption>{caption}</Caption>;
  }

  renderHead() {
    const { head, sortKey, sortOrder } = this.props;

    if (!head) return null;

    const { cells, ...rest } = head;

    return (
      <TableHead {...rest}>
        <tr>
          {
            cells.map((cell, index) => {
              const { isSortable, key, content, ...restCellProps } = cell;
              const { isFixedSize } = this.props;
              return (
                <TableHeadCell
                  key={key || index}
                  onClick={isSortable && this.onSort(cell)}
                  isFixedSize={isFixedSize}
                  isSortable={isSortable}
                  sortOrder={key === sortKey && sortOrder}
                  {...restCellProps}
                >
                  <span>
                    {content}
                  </span>
                </TableHeadCell>
              );
            })
          }
        </tr>
      </TableHead>
    );
  }

  renderBody() {
    const { rowsPerPage, page } = this.props;
    const rows = this.getSortedRows();

    return (
      <tbody>
        {
          (rows || [])
            .slice((page - 1) * rowsPerPage, page * rowsPerPage)
            .map((row, rowIndex) => this.renderBodyRow(row, rowIndex))
        }
      </tbody>
    );
  }

  renderBodyRow(row, rowIndex) {
    const { head, isFixedSize } = this.props;
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
  }

  render() {
    const { rows, isFixedSize, rowsPerPage, emptyView, page } = this.props;
    const extraProps = omit(this.props, Object.keys(DynamicTable.propTypes));
    const totalPages = rows ? Math.ceil(rows.length / rowsPerPage) : 0;

    return !(rows && rows.length) ? emptyView : (
      <div>
        <Table isFixedSize={isFixedSize} {...extraProps}>
          { this.renderCaption() }
          { this.renderHead() }
          { this.renderBody() }
        </Table>
        {
          !totalPages ? null : <Pagination
            current={page}
            total={totalPages}
            onSetPage={this.onSetPage}
          />
        }
      </div>
    );
  }
}
