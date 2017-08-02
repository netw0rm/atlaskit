import * as React from 'react';
import {Component} from 'react';
import {Context, FileItem} from '@atlaskit/media-core';
import {Wrapper} from './styled';
import {MediaIdentifier} from '../..';
import {ItemTools} from '../../views';
import PDF from 'react-pdf-js';

export interface PdfViewerProps {
  identifier: MediaIdentifier;
  metadata: FileItem;
  context: Context;
}

export interface PdfViewerState {
  dataURI?: string;
  scale: number;
}

export class PdfViewer extends Component<PdfViewerProps, PdfViewerState> {

  private defaultScale: number = 2;

  state:PdfViewerState = {
    scale: this.defaultScale
  };

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

  componentWillReceiveProps(nextProps: PdfViewerProps) {
    if (nextProps.metadata.details.id === this.props.metadata.details.id) {
      return;
    }

    this.fetchDataURI(nextProps.metadata);
  }

  render() {
    const {dataURI, scale} = this.state;
    const pdfViewer = dataURI ? <PDF file={dataURI} scale={scale}/> : null;
    return (
      <Wrapper>
        <ItemTools
          onZoomOut={this.onZoomOut}
          onZoomIn={this.onZoomIn}
          onZoomFit={this.onZoomFit}
        />
        {pdfViewer}
      </Wrapper>
    );
  }

  onZoomOut = () => {
    const {scale} = this.state;
    this.setState({scale: scale - 0.1})
  }

  onZoomIn = () => {
    const {scale} = this.state;
    this.setState({scale: scale + 0.1})
  }

  onZoomFit = () => {
    this.setState({scale: this.defaultScale});
  }
}
