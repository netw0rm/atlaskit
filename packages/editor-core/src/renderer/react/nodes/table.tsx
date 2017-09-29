import * as React from 'react';
import {
  StyledTable
} from '../../../editor/ui/ContentStyles';

// tslint:disable-next-line:variable-name
const Table = (props, params) => <StyledTable key={params.key}><tbody>{params.children}</tbody></StyledTable>;
export default Table;
