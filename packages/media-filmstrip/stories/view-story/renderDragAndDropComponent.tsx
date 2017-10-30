/* tslint:disable: variable-name */
import * as React from 'react';
import {Component} from 'react';
import styled from 'styled-components';
import {Filmstrip} from '../../src/filmstrip';

export interface StoryProps {
}

export interface StoryState {

}

const Box = styled.div`
  width: 250px;
  height: 100px;
  background-color: lightgreen;
`;

const Dropzone = styled.div`
  width: 300px;
  height: 150px;
  border: 2px solid red;
`;

export class Story extends Component<StoryProps, StoryState> {
  state = {

  }

  render() {
    const {dropzoneElement} = this.state;

    return (
      <div>
        <h1>Drag & Drop</h1>
        <Dropzone innerRef={this.saveDropzone} />
        <Filmstrip dropzoneElement={dropzoneElement}>
          <Box/>
          <Box/>
          <Box/>
          <Box/>
          <Box/>
          <Box/>
          <Box/>
        </Filmstrip>
      </div>
    );
  }

  saveDropzone = (dropzoneElement) => {
    this.setState({
      dropzoneElement
    });
  }
}

export default () => <Story/>;
