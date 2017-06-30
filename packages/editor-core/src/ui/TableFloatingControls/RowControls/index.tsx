import * as React from 'react';
import { Component } from 'react';
import {
  RowInner,
  RowContainer,
  RowControlsButtonWrap,
  HeaderButton,
  RowLineMarker,
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
    const lineMarkerWidth = this.props.tableElement.offsetWidth + 11;

    for (let i = 0, len = rows.length; i < len; i++) {
      nodes.push(
        <RowControlsButtonWrap
          key={i}
          className={this.props.isSelected(i) ? 'active' : ''}
          style={{ height: (rows[i] as HTMLElement).offsetHeight + 1 }}
        >
          {/* tslint:disable-next-line:jsx-no-lambda */}
          <HeaderButton onClick={() => this.props.selectRow(i)} />
          <InsertRowButton
            insertRow={this.props.insertRow}
            index={i + 1}
          >
            <RowLineMarker style={{ width: lineMarkerWidth }} />
          </InsertRowButton>
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
