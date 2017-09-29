import * as React from 'react';

// tslint:disable-next-line:variable-name
const TableCell = (props, params) => <td key={params.key}>{params.children}</td>;
export default TableCell;
