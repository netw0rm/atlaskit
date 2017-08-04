import * as React from 'react';
import { Component } from 'react';

import { PickerProps } from '../';
import {
  Wrapper
} from './styled';

export interface DropzoneProps extends PickerProps {
  headless?: boolean;
}

export interface DropzoneState {
  hasDraggedOver: boolean;
}

export class Dropzone extends Component<DropzoneProps, DropzoneState> {
  state = {
    hasDraggedOver: false
  };

  render() {
    const {children} = this.props;
    const {hasDraggedOver} = this.state;

    return (
      <Wrapper
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        hasDraggedOver={hasDraggedOver}
      >
        {children}
      </Wrapper>
    );
  }

  private onDragEnter = () => {
    this.setState({hasDraggedOver: true});
  }

  private onDragLeave = () => {
    this.setState({hasDraggedOver: false});
  }

  private onDrop = (evt) => {
    evt.preventDefault();
    this.setState({hasDraggedOver: false});
  }
}
