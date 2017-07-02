import * as React from 'react';
import { Component } from 'react';
import {
  RowInner,
  RowContainer,
  RowControlsButtonWrap,
  HeaderButton,
  RowSelection,
} from './styles';
import InsertRowButton from './InsertRowButton';

export interface Props {
  tableElement: HTMLElement;
  isSelected: (row: number) => boolean;
  selectRow: (row: number) => void;
  insertRow: (row: number) => void;
}

export default class RowControls extends Component<Props, any> {
  render () {
    const rows = this.props.tableElement.querySelector('tbody')!.children;
    const nodes: any = [];
    const tableWidth = this.props.tableElement.offsetWidth;

    for (let i = 0, len = rows.length; i < len; i++) {
      const rowHeight = (rows[i] as HTMLElement).offsetHeight;

      nodes.push(
        <RowControlsButtonWrap
          key={i}
          className={this.props.isSelected(i) ? 'active' : ''}
          style={{ height: rowHeight + 1 }}
        >
          {/* tslint:disable-next-line:jsx-no-lambda */}
          <HeaderButton onClick={() => this.props.selectRow(i)} />
          <RowSelection style={{ width: tableWidth - 4, height: rowHeight - 3 }} />
          <InsertRowButton
            insertRow={this.props.insertRow}
            index={i + 1}
            lineMarkerWidth={tableWidth + 11}
          />
        </RowControlsButtonWrap>
      );
    }

    return (
      <RowContainer>
        <RowInner>{nodes}</RowInner>
      </RowContainer>
    );
  }
}
