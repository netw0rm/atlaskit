import * as React from 'react';
import { Component } from 'react';
import {
  CornerContainer,
  CornerButton,
} from './styles';
import InsertColumnButton from '../ColumnControls/InsertColumnButton';
import InsertRowButton from '../RowControls/InsertRowButton';

export interface Props {
  isSelected: () => boolean;
  selectTable: () => void;
  insertColumn: (column: number) => void;
  insertRow: (row: number) => void;
}

export default class CornerControls extends Component<Props, any> {
  render () {
    return (
      <CornerContainer className={this.props.isSelected() ? 'active' : ''}>
        <CornerButton onClick={this.props.selectTable} />
        <InsertColumnButton
          style={{right: '-13px', top: '-24px'}}
          index={0}
          insertColumn={this.props.insertColumn}
        />
        <InsertRowButton
          style={{bottom: '-13px', left: '-24px'}}
          index={0}
          insertRow={this.props.insertRow}
        />
      </CornerContainer>
    );
  }
}
