import * as React from 'react';

// tslint:disable-next-line:variable-name
const TableRow = (props, params) => <tr key={params.key}>{params.children}</tr>;
export default TableRow;
