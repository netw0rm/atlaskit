import * as React from 'react';
import {Component} from 'react';
import {ImageViewerWrapper, Img} from './styled';
import {Context, FileItem} from '@atlaskit/media-core';
import {MediaIdentifier} from '..';

export interface ImageViewerProps {
  identifier: MediaIdentifier;
  metadata: FileItem;
  context: Context;
}

export interface ImageViewerState {
  dataURI?: string;
}

export class ImageViewer extends Component<ImageViewerProps, ImageViewerState> {
  state:ImageViewerState = {

  }

  fetchDataURI(metadata: FileItem) {
    const {context} = this.props;
    const {collectionName} = this.props.identifier;
    const setDataURI = dataURI => this.setState({dataURI});
    const clearDataURI = () => this.setState({dataURI: undefined});
    const dataURIService = context.getDataUriService(collectionName);

    dataURIService.fetchOriginalDataUri(metadata).then(setDataURI, clearDataURI);
  }

  componentDidMount() {
    const {metadata} = this.props;
    this.fetchDataURI(metadata);
  }

  componentWillReceiveProps(nextProps: ImageViewerProps) {
    // TODO: Check if the item id has changed
    console.log('componentWillReceiveProps', nextProps.metadata.details.id)
    this.fetchDataURI(nextProps.metadata);
  }

  render() {
    const {dataURI} = this.state;

    return (
      <ImageViewerWrapper>
        <Img src={dataURI} />
      </ImageViewerWrapper>
    );
  }
}