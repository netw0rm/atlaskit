import * as React from 'react';
import { Component } from 'react';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import ToolbarButton from '../../ToolbarButton';
import {
  CornerContainer,
  CornerButton,
} from './styles';
import {
  ColumnInsertButtonWrap,
  ColumnInsertMarker,
  ColumnInsertButton,
} from '../ColumnHeader/styles';
import {
  RowInsertButtonWrap,
  RowInsertMarker,
  RowInsertButton,
} from '../RowHeader/styles';

export interface Props {
  isSelected: () => boolean;
  selectTable: () => void;
}

export default class CornerHeader extends Component<Props, {}> {
  render () {
    return (
      <CornerContainer className={this.props.isSelected() ? 'active' : ''}>
        <CornerButton onClick={this.props.selectTable} />
        <CornerColumnInsertButton />
        <CornerRowInsertButton />
      </CornerContainer>
    );
  }
}

export interface ButtonState {
  hovered: boolean;
}

class CornerColumnInsertButton extends Component<{}, ButtonState> {
  state = {
    hovered: false
  };
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
    return (
      <ColumnInsertButtonWrap
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        style={{right: '-13px', top: '-24px'}}
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
    );
  }
}

class CornerRowInsertButton extends Component<{}, ButtonState> {
  state = {
    hovered: false
  };
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
    return (
      <RowInsertButtonWrap
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        style={{bottom: '-13px', left: '-24px'}}
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
    );
  }
}
