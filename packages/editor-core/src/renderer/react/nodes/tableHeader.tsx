import * as React from 'react';

// tslint:disable-next-line:variable-name
const TableHeader = (props, params) => <th key={params.key}>{params.children}</th>;
export default TableHeader;
