import * as React from 'react';
import { Component } from 'react';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import ToolbarButton from '../../ToolbarButton';
import {
  InsertColumnButtonWrap,
  InsertColumnMarker,
  InsertColumnButtonInner,
} from './styles';

export interface ButtonProps {
  index: number;
  style?: object;
  insertColumn: (column: number) => void;
}

export default class InsertColumnButton extends Component<ButtonProps, any> {
  handleInsert = () => this.props.insertColumn(this.props.index);

  render () {
    return (
      <InsertColumnButtonWrap style={this.props.style}>
        <InsertColumnButtonInner>
          <ToolbarButton
            onClick={this.handleInsert}
            iconBefore={<AddIcon label="Add column" />}
          />
        </InsertColumnButtonInner>
        <InsertColumnMarker />
      </InsertColumnButtonWrap>
    );
  }
}
