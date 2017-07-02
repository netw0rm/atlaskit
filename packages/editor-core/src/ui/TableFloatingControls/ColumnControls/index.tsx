import * as React from 'react';
import { Component } from 'react';
import {
  ColumnContainer,
  ColumnInner,
  ColumnControlsButtonWrap,
  HeaderButton,
  ColumnSelection,
} from './styles';
import InsertColumnButton from './InsertColumnButton';

export interface Props {
  tableElement: HTMLElement;
  isSelected: (column: number) => boolean;
  selectColumn: (column: number) => void;
  insertColumn: (column: number) => void;
}

export default class ColumnControls extends Component<Props, any> {
  render () {
    const cols = this.props.tableElement.querySelector('tr')!.children;
    const nodes: any = [];
    const tableHeight = this.props.tableElement.offsetHeight;

    for (let i = 0, len = cols.length; i < len; i++) {
      const colWidth = (cols[i] as HTMLElement).offsetWidth;
      nodes.push(
        <ColumnControlsButtonWrap
          key={i}
          className={this.props.isSelected(i) ? 'active' : ''}
          style={{ width: colWidth + 1 }}
        >
          {/* tslint:disable-next-line:jsx-no-lambda */}
          <HeaderButton onClick={() => this.props.selectColumn(i)} />
          <ColumnSelection style={{ height: tableHeight - 4, width: colWidth - 3 }} />
          <InsertColumnButton
            insertColumn={this.props.insertColumn}
            index={i + 1}
            lineMarkerHeight={tableHeight + 11}
          />
        </ColumnControlsButtonWrap>
      );
    }

    return (
      <ColumnContainer>
        <ColumnInner>{nodes}</ColumnInner>
      </ColumnContainer>
    );
  }
}
