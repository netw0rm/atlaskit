/* tslint:disable: variable-name */
import * as React from 'react';
import {Component} from 'react';
import styled from 'styled-components';
import {CardView} from '@atlaskit/media-card';
import {imageFileDetails, smallImage, audioFileDetails, docFileDetails, unknownFileDetails, videoFileDetails, wideImage, smallTransparentImage, tallImage} from '@atlaskit/media-test-helpers';
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

const tallCard = <CardView id="1" status="complete" metadata={imageFileDetails} dataURI={tallImage} />;
const smallCard = <CardView id="2" status="complete" metadata={imageFileDetails} dataURI={smallImage} />;
const audioCard = <CardView id="3" status="complete" metadata={audioFileDetails} />;
const videoCard = <CardView id="4" status="complete" metadata={videoFileDetails} />;
const docCard = <CardView id="5" status="complete" metadata={docFileDetails} />;
const unknownCard = <CardView id="6" status="complete" metadata={unknownFileDetails} />;
const wideCard = <CardView id="7" status="complete" metadata={imageFileDetails} dataURI={wideImage} />;
const smallTransparentCard = <CardView id="8" status="complete" metadata={imageFileDetails} dataURI={smallTransparentImage} />;

export class Story extends Component<StoryProps, StoryState> {
  state = {

  }

  render() {
    const {dropzoneElement} = this.state;
    // <h1>Drag & Drop</h1>
    //     <Dropzone innerRef={this.saveDropzone} />
    return (
      <div>
        <div style={{width: 500}}>
          <Filmstrip dropzoneElement={dropzoneElement}>
            {tallCard}
            {audioCard}
            {videoCard}
            {smallCard}
            {docCard}
            {unknownCard}
            {wideCard}
            {smallTransparentCard}
          </Filmstrip>
        </div>
        <div>
          <Filmstrip dropzoneElement={dropzoneElement}>
            {tallCard}
            {audioCard}
            {videoCard}
            {smallCard}
            {docCard}
            {unknownCard}
            {wideCard}
            {smallTransparentCard}
          </Filmstrip>
        </div>
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
        <div style={{width: 700}}>
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
