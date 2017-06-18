import * as React from 'react';
import { Component } from 'react';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import ToolbarButton from '../../ToolbarButton';
import {
  RowInner,
  RowContainer,
  RowHeaderButtonWrap,
  HeaderButton,
  RowInsertButtonWrap,
  RowInsertMarker,
  RowInsertButton,
} from './styles';

export interface Props {
  tableElement: HTMLElement;
  isSelected: (row: number) => boolean;
  selectRow: (row: number) => void;
}

export default class RowHeader extends Component<Props, {}> {
  render () {
    const rows = this.props.tableElement!.querySelector('tbody')!.children;
    const nodes: any = [];

    for (let i = 0, len = rows.length; i < len; i++) {
      nodes.push(
        <RowHeaderButton
          key={i}
          height={(rows[i] as HTMLElement).offsetHeight + 1}
          active={this.props.isSelected(i)}
          index={i}
          selectRow={this.props.selectRow}
        />
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
  height: number;
  active: boolean;
  index: number;
  selectRow: (row: number) => void;
}

class RowHeaderButton extends Component<ButtonProps, {}> {
  state = {
    hovered: false
  };

  handleClick = () => {
    this.props.selectRow(this.props.index);
  }
  handleMouseOver = () => {
    this.setState({ hovered: true });
  }
  handleMouseLeave = () => {
    this.setState({ hovered: false });
  }
  handleInsert = () => {
    // console.log('INSERT!', this.props.index);
  }

  render () {
    const { height, active } = this.props;

    return (
      <RowHeaderButtonWrap style={{ height }} className={active ? 'active' : ''}>
        <HeaderButton onClick={this.handleClick} />
        <RowInsertButtonWrap
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
        >
          {this.state.hovered && (
              <RowInsertButton>
                <ToolbarButton
                  onClick={this.handleInsert}
                  iconBefore={<AddIcon label="Add column" />}
                />
              </RowInsertButton>
          )}
          <RowInsertMarker />
        </RowInsertButtonWrap>
      </RowHeaderButtonWrap>
    );
  }
}
