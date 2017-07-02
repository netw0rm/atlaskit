import * as React from 'react';
import { Component } from 'react';
import {
  CornerContainer,
  CornerButton,
  TableSelection,
} from './styles';
import InsertColumnButton from '../ColumnControls/InsertColumnButton';
import InsertRowButton from '../RowControls/InsertRowButton';

export interface Props {
  tableElement: HTMLElement;
  isSelected: () => boolean;
  selectTable: () => void;
  insertColumn: (column: number) => void;
  insertRow: (row: number) => void;
}

export default class CornerControls extends Component<Props, any> {
  render () {
    const { tableElement } = this.props;
    const tableWidth = tableElement.offsetWidth;
    const tableHeight = tableElement.offsetHeight;

    return (
      <CornerContainer className={this.props.isSelected() ? 'active' : ''}>
        <CornerButton onClick={this.props.selectTable} />
        <TableSelection style={{ width: tableWidth - 4, height: tableHeight - 4 }} />
        <InsertColumnButton
          style={{right: '-11px', top: '-19px'}}
          index={0}
          insertColumn={this.props.insertColumn}
          lineMarkerHeight={tableHeight + 11}
        />
        <InsertRowButton
          style={{bottom: '-11px', left: '-19px'}}
          index={0}
          insertRow={this.props.insertRow}
          lineMarkerWidth={tableWidth + 11}
        />
      </CornerContainer>
    );
  }
}
