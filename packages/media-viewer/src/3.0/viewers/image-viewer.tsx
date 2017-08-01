import * as React from 'react';
import {Component} from 'react';
import {ImageViewerWrapper, Img} from './styled';

export interface ImageViewerProps {
  dataURI: string;
}

export interface ImageViewerState {
  
}

export class ImageViewer extends Component<ImageViewerProps, ImageViewerState> {
  render() {
    const {dataURI} = this.props;

    return (
      <ImageViewerWrapper>
        <Img src={dataURI} />
      </ImageViewerWrapper>
    );
  }
}