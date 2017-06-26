import * as React from 'react';
import { Component } from 'react';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import ToolbarButton from '../../ToolbarButton';
import {
  RowInner,
  RowContainer,
  RowHeaderButtonWrap,
  HeaderButton,
  InsertRowButtonWrap,
  InsertRowMarker,
  InsertRowButtonInner,
} from './styles';

export interface Props {
  tableElement: HTMLElement;
  isSelected: (row: number) => boolean;
  selectRow: (row: number) => void;
  insertRow: (row: number) => void;
}

export default class RowHeader extends Component<Props, any> {
  render () {
    const rows = this.props.tableElement!.querySelector('tbody')!.children;
    const nodes: any = [];

    for (let i = 0, len = rows.length; i < len; i++) {
      nodes.push(
        <RowHeaderButtonWrap
          key={i}
          className={this.props.isSelected(i) ? 'active' : ''}
          style={{ height: (rows[i] as HTMLElement).offsetHeight + 1 }}
        >
          {/* tslint:disable-next-line:jsx-no-lambda */}
          <HeaderButton onClick={() => this.props.selectRow(i)} />
          <InsertRowButton
            insertRow={this.props.insertRow}
            index={i + 1}
          />
        </RowHeaderButtonWrap>
      );
    }

    return (
      <RowContainer>
        <RowInner>{nodes}</RowInner>
      </RowContainer>
    );
  }
}

export interface ButtonProps {
  index: number;
  style?: object;
  insertRow: (row: number) => void;
}

export interface ButtonState {
  hovered: boolean;
}

export class InsertRowButton extends Component<ButtonProps, ButtonState> {
  state = {
    hovered: false
  };

  handleMouseOver = () => this.setState({ hovered: true });
  handleMouseLeave = () => this.setState({ hovered: false });
  handleInsert = () => this.props.insertRow(this.props.index);

  render () {
    return (
      <InsertRowButtonWrap
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        style={this.props.style}
      >
        {this.state.hovered && (
          <InsertRowButtonInner>
            <ToolbarButton
              onClick={this.handleInsert}
              iconBefore={<AddIcon label="Add row" />}
            />
          </InsertRowButtonInner>
        )}
        <InsertRowMarker />
      </InsertRowButtonWrap>
    );
  }
}
