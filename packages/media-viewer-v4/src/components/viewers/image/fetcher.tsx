import * as React from 'react';
import {Context, FileDetails} from '@atlaskit/media-core';
import getFileBinaryUrl from '../../../utils/getFileBinaryURL';
import {ImageView} from './view';

export interface ImageFetcherProps {
  context: Context;
  details: FileDetails;
  collectionName?: string;
}

export interface ImageFetcherState {
  imageURL?: string;
  error?: string;
  zoomLevel: number;
}

export class ImageFetcher extends React.Component<ImageFetcherProps, ImageFetcherState> {

  state: ImageFetcherState = {
    zoomLevel: 100
  };

  handleZoomOut = () => {
    this.setState(({zoomLevel}) => ({zoomLevel: Math.max(zoomLevel - 20, 5)}));
  }

  handleZoomIn = () => {
    this.setState(({zoomLevel}) => ({zoomLevel: zoomLevel + 20}));
  }

  handleZoomFit = () => {
    this.setState({zoomLevel: 100});
  }

  handleError = () => {
    const {imageURL} = this.state;
    this.setState({error: `Couldn't load ${imageURL}`});
  }

  async componentDidMount() {
    const {context, details, collectionName} = this.props;
    try {
      const imageURL = await getFileBinaryUrl(details, context, collectionName);
      setTimeout(() =>{ // TODO: for testing purposed. Please remove before used
        this.setState({imageURL, error: undefined});
      }, 500);
    } catch(error) {
      this.setState({imageURL: undefined, error: 'Error fetching image'});
    }
  }

  render() {
    const {imageURL, zoomLevel, error} = this.state;
    return (
      <ImageView
        imageURL={imageURL}
        error={error}
        zoomLevel={zoomLevel}
        onLoadError={this.handleError}
        onZoomFit={this.handleZoomFit}
        onZoomIn={this.handleZoomIn}
        onZoomOut={this.handleZoomOut}
      />
    );
  }

}
