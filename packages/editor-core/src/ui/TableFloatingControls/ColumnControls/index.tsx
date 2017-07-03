import * as React from 'react';
import { Component } from 'react';
import { toolbarSize } from '../styles';
import {
  ColumnContainer,
  ColumnInner,
  ColumnControlsButtonWrap,
  HeaderButton,
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
      nodes.push(
        <ColumnControlsButtonWrap
          key={i}
          className={this.props.isSelected(i) ? 'active' : ''}
          style={{ width: (cols[i] as HTMLElement).offsetWidth + 1 }}
        >
          {/* tslint:disable-next-line:jsx-no-lambda */}
          <HeaderButton onClick={() => this.props.selectColumn(i)} />
          <InsertColumnButton
            insertColumn={this.props.insertColumn}
            index={i + 1}
            lineMarkerHeight={tableHeight + toolbarSize}
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
