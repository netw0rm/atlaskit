import * as React from 'react';
import {Component} from 'react';
import {Context, FileItem} from '@atlaskit/media-core';
import {Wrapper} from './styled';
import {MediaIdentifier} from '../../domain';
import {ItemTools} from '../../views/itemTools';
import PDF from 'react-pdf-js';
import {getBinaryURL} from '../../utils';

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

  state: PdfViewerState = {
    scale: this.defaultScale
  };

  componentDidMount() {
    this.updateUrl();
  }

  componentWillReceiveProps(nextProps: PdfViewerProps) {
    if (nextProps.metadata.details.id === this.props.metadata.details.id) {
      return;
    }
    this.updateUrl();
  }

  updateUrl = () => {
    const {metadata, context, identifier} = this.props;
    getBinaryURL(metadata, context, identifier.collectionName).then((url) => {
      this.setState({dataURI: url});
    });
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
          zoomLevel={scale * 100}
        />
        {pdfViewer}
      </Wrapper>
    );
  }

  onZoomOut = () => {
    const {scale} = this.state;
    if (scale <= 0.4) { return; }
    this.setState({scale: scale - 0.2});
  }

  onZoomIn = () => {
    const {scale} = this.state;
    this.setState({scale: scale + 0.2});
  }

  onZoomFit = () => {
    this.setState({scale: this.defaultScale});
  }
}
