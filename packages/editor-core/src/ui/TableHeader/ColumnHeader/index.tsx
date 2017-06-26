import * as React from 'react';
import { Component } from 'react';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import ToolbarButton from '../../ToolbarButton';
import {
  ColumnContainer,
  ColumnInner,
  ColumnHeaderButtonWrap,
  HeaderButton,
  InsertColumnButtonWrap,
  InsertColumnMarker,
  InsertColumnButtonInner,
} from './styles';

export interface Props {
  tableElement: HTMLElement;
  isSelected: (column: number) => boolean;
  selectColumn: (column: number) => void;
  insertColumn: (column: number) => void;
}

export default class ColumnHeader extends Component<Props, any> {
  render () {
    const cols = this.props.tableElement!.querySelector('tr')!.children;
    const nodes: any = [];

    for (let i = 0, len = cols.length; i < len; i++) {
      nodes.push(
        <ColumnHeaderButtonWrap
          key={i}
          className={this.props.isSelected(i) ? 'active' : ''}
          style={{ width: (cols[i] as HTMLElement).offsetWidth + 1 }}
        >
          {/* tslint:disable-next-line:jsx-no-lambda */}
          <HeaderButton onClick={() => this.props.selectColumn(i)} />
          <InsertColumnButton
            insertColumn={this.props.insertColumn}
            index={i + 1}
          />
        </ColumnHeaderButtonWrap>
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
  index: number;
  style?: object;
  insertColumn: (column: number) => void;
}

export interface ButtonState {
  hovered: boolean;
}

export class InsertColumnButton extends Component<ButtonProps, ButtonState> {
  state = {
    hovered: false
  };

  handleMouseOver = () => this.setState({ hovered: true });
  handleMouseLeave = () => this.setState({ hovered: false });
  handleInsert = () => this.props.insertColumn(this.props.index);

  render () {
    return (
      <InsertColumnButtonWrap
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        style={this.props.style}
      >
        {this.state.hovered && (
          <InsertColumnButtonInner>
            <ToolbarButton
              onClick={this.handleInsert}
              iconBefore={<AddIcon label="Add column" />}
            />
          </InsertColumnButtonInner>
        )}
        <InsertColumnMarker />
      </InsertColumnButtonWrap>
    );
  }
}
