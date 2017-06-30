import * as React from 'react';
import { Component } from 'react';
import {
  CornerContainer,
  CornerButton,
  RowLineMarker,
  ColumnLineMarker,
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
    const lineMarkerWidth = tableElement.offsetWidth + 11;
    const lineMarkerHeight = tableElement.offsetHeight + 11;

    return (
      <CornerContainer className={this.props.isSelected() ? 'active' : ''}>
        <CornerButton onClick={this.props.selectTable} />
        <InsertColumnButton
          style={{right: '-11px', top: '-19px'}}
          index={0}
          insertColumn={this.props.insertColumn}
        >
          <ColumnLineMarker style={{ height: lineMarkerHeight }} />
        </InsertColumnButton>
        <InsertRowButton
          style={{bottom: '-11px', left: '-19px'}}
          index={0}
          insertRow={this.props.insertRow}
        >
          <RowLineMarker style={{ width: lineMarkerWidth }} />
        </InsertRowButton>
      </CornerContainer>
    );
  }
}
