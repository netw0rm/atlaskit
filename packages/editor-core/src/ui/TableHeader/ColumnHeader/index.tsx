import * as React from 'react';
import { Component } from 'react';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import ToolbarButton from '../../ToolbarButton';
import {
  ColumnContainer,
  ColumnInner,
  ColumnHeaderButtonWrap,
  HeaderButton,
  ColumnInsertButtonWrap,
  ColumnInsertMarker,
  ColumnInsertButton,
} from './styles';

export interface Props {
  tableElement: HTMLElement;
  isSelected: (column: number) => boolean;
  selectColumn: (column: number) => void;
}

export default class ColumnHeader extends Component<Props, {}> {
  render () {
    const cols = this.props.tableElement!.querySelector('tr')!.children;
    const nodes: any = [];

    for (let i = 0, len = cols.length; i < len; i++) {
      nodes.push(
        <ColumnHeaderButton
          key={i}
          width={(cols[i] as HTMLElement).offsetWidth + 1}
          active={this.props.isSelected(i)}
          index={i}
          selectColumn={this.props.selectColumn}
        />
      );
    }

    return (
      <ColumnContainer>
        <ColumnInner>{nodes}</ColumnInner>
      </ColumnContainer>
    );
  }
}

export interface ButtonProps {
  width: number;
  active: boolean;
  index: number;
  selectColumn: (column: number) => void;
}

class ColumnHeaderButton extends Component<ButtonProps, {}> {
  state = {
    hovered: false
  };

  handleClick = () => {
    this.props.selectColumn(this.props.index);
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
    const { width, active } = this.props;

    return (
      <ColumnHeaderButtonWrap style={{ width }} className={active ? 'active' : ''}>
        <HeaderButton onClick={this.handleClick} />
        <ColumnInsertButtonWrap
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
        >
          {this.state.hovered && (
              <ColumnInsertButton>
                <ToolbarButton
                  onClick={this.handleInsert}
                  iconBefore={<AddIcon label="Add column" />}
                />
              </ColumnInsertButton>
          )}
          <ColumnInsertMarker />
        </ColumnInsertButtonWrap>
      </ColumnHeaderButtonWrap>
    );
  }
}
