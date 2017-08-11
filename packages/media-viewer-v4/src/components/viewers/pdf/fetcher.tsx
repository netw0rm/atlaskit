import * as React from 'react';
import {Context, FileDetails} from '@atlaskit/media-core';
import getFileBinaryUrl from '../../../utils/getFileBinaryURL';
import {PDFView} from './view';

export interface PDFFetcherProps {
  context: Context;
  details: FileDetails;
  collectionName?: string;
}

export interface PDFFetcherState {
  url?: string;
  error?: string;
  // zoomLevel: number;
}

export class PDFFetcher extends React.Component<PDFFetcherProps, PDFFetcherState> {

  state: PDFFetcherState = {
  };

  async componentDidMount() {
    const {context, details, collectionName} = this.props;
    try {
      const url = await getFileBinaryUrl(details, context, collectionName); // TODO: use document.pdf url
      this.setState({url, error: undefined});
    } catch(error) {
      this.setState({url: undefined, error: 'Error fetching pdf'});
    }
  }

  render() {
    const {url, error} = this.state;
    return (
      <PDFView
        url={url}
        error={error}
      />
    );
        // {/* zoomLevel={zoomLevel} */}
        // {/* onLoadError={this.handleError}
        // onZoomFit={this.handleZoomFit}
        // onZoomIn={this.handleZoomIn}
        // onZoomOut={this.handleZoomOut} */}
  }

}
