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
  margin: 0 5px;
  ${({id}) => {
    return `
      background-color: ${id};
    `;
  }}
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
    // <h1>Drag & Drop</h1>
    //     <Dropzone innerRef={this.saveDropzone} />
    return (
      <div>
        
        <Filmstrip dropzoneElement={dropzoneElement}>
          <Box id="blue"/>
          <Box id="green"/>
          <Box id="black"/>
          <Box id="purple"/>
          <Box id="yellow"/>
          <Box id="darkgray"/>
          <Box id="darkgreen"/>
          <Box id="darkblue"/>
          <Box id="darkred"/>
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
