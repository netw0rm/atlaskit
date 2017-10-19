import * as React from 'react';
import {
    Editor
} from '@atlaskit/editor-core';

const { StyledTable } = Editor;

// tslint:disable-next-line:variable-name
const Table = (props) => <StyledTable><tbody>{props.children}</tbody></StyledTable>;
export default Table;
