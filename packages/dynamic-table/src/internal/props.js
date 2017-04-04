import { PropTypes } from 'react';
import { createError } from '@atlaskit/util-common';
import { ASC, DESC } from './constants';

function isInteger(props, propName, componentName) {
  if (props[propName] === undefined) return null;
  if (!Number.isInteger(props[propName]) && props[propName] !== Infinity) {
    const message = `'${propName}' should be an integer or an infinity, got ${props[propName]} instead`;
    return createError(propName, componentName, message);
  }
  return null;
}
isInteger.isRequired = false;

const rowCellObject = {
  key: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
  content: PropTypes.node,
};

const rowCell = PropTypes.shape(rowCellObject);

function rowCells(props, propName, componentName, ...rest) {
  const initialCheck = PropTypes.arrayOf(rowCell)(props, propName, componentName, ...rest);
  if (initialCheck instanceof Error) {
    return initialCheck;
  }

  if (!props.head || !props.head.cells) return null;

  const isAllRowsSameLength = props[propName].reduce((result, row) =>
    result && row.length === props.head.cells.length, true);
  if (!isAllRowsSameLength) {
    return createError(propName, componentName, 'One of the rows has different cell-count compared to head.');
  }
  return null;
}

function isSortable(props, propName, componentName, ...rest) {
  const initialCheck = PropTypes.bool(props, propName, componentName, ...rest);
  if (initialCheck instanceof Error) {
    return initialCheck;
  }
  if (props[propName] && !props.key) {
    return createError(propName, componentName, `'${propName}' can't be set to true, if the 'key' prop is missing.`);
  }
  return null;
}
isSortable.isRequired = false;

const headCellObject = {
  ...rowCellObject,
  isSortable,
  width: PropTypes.number,
  shouldTruncate: PropTypes.bool,
};
const headCell = PropTypes.shape(headCellObject);
const head = PropTypes.shape({
  cells: PropTypes.arrayOf(headCell),
});

const rows = PropTypes.arrayOf(PropTypes.shape({
  cells: rowCells,
}));

function sortKey(props, propName, componentName) {
  if (!props[propName]) return null;
  const headHasKey = props.head.cells
    .map(cell => cell.key)
    .includes(props[propName]);

  if (!headHasKey) {
    return createError(propName, componentName, `Cell with ${props[propName]} key not found in head.`);
  }
  return null;
}
sortKey.isRequired = false;

const caption = PropTypes.node;
const sortOrder = PropTypes.oneOf([ASC, DESC]);
const isFixedSize = PropTypes.bool;
const rowsPerPage = isInteger;
const page = isInteger;
const onSetPage = PropTypes.func;
const onSort = PropTypes.func;
const emptyView = PropTypes.node;

const commonPropTypes = {
  caption,
  head,
  rows,
  emptyView,
  isFixedSize,
  rowsPerPage,
  onSetPage,
  onSort,
};

const commonDefaultProps = {
  caption: null,
  head: null,
  rows: null,
  emptyView: null,
  isFixedSize: false,
  rowsPerPage: Infinity,
  onSetPage() {},
  onSort() {},
};

export const statelessPropTypes = {
  ...commonPropTypes,
  page,
  sortKey,
  sortOrder,
};

export const statefulPropTypes = {
  ...commonPropTypes,
  defaultPage: page,
  defaultSortKey: sortKey,
  defaultSortOrder: sortOrder,
};

export const statelessDefaultProps = {
  ...commonDefaultProps,
  page: 1,
  sortKey: null,
  sortOrder: null,
};

export const statefulDefaultProps = {
  ...commonDefaultProps,
  defaultPage: 1,
  defaultSortKey: null,
  defaultSortOrder: null,
};
