import * as React from 'react';
import {Component} from 'react';
import {Context, FileItem} from '@atlaskit/media-core';
import {Wrapper} from './styled';
import {MediaIdentifier} from '../../domain';
import {ItemTools} from '../../views/itemTools';
import Viewer from './viewer';
// tslint:disable-next-line
const pdfjsLib = require('pdfjs-dist/webpack');

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
  constructor(props: any){
      super(props);
  }

  private defaultScale: number = 1;
  private viewer: any = null;

  state: PdfViewerState = {
    scale: this.defaultScale
  };

  fetchDataURI(metadata: FileItem) {
    const {context} = this.props;
    const {collectionName} = this.props.identifier;
    const setDataURI = dataURI => {
      this.setState({dataURI});
      this.loadDocument();
    };
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

  loadDocument() {
    // const loadingTask = pdfjsLib.getDocument(this.state.dataURI);
    // const loadingTask = pdfjsLib.getDocument('http://local.atlassian.io:5001/pdf-document-t3n-colors.pdf');
    const loadingTask = pdfjsLib.getDocument('http://local.atlassian.io:5001/pdf-document-highlight.pdf');
    loadingTask.promise.then((doc) => {
      this.viewer.setState({ doc });
    }, (reason) => {
      console.error(`Error during loading: ${reason}`);
    });
  }

  displayScaleChanged = (e) => {
    this.setState({
      scale: e.scale
    });
  }

  zoomIn = (e) => {
    this.viewer.setState({
      scale: this.viewer.state.scale + 0.1
    });
  }
  zoomOut = (e) => {
    this.viewer.setState({
      scale: this.viewer.state.scale - 0.1
    });
  }

  zoomFit = (e) => {
    this.viewer.setState({
      scale: 1
    });
  }

  render() {
    return (
      <Wrapper>
        <ItemTools
          onZoomOut={this.zoomOut}
          onZoomIn={this.zoomIn}
          onZoomFit={this.zoomFit}
          zoomLevel={this.state.scale * 100}
        />
        <Viewer
          onScaleChanged={this.displayScaleChanged}
          ref={ref => this.viewer = ref}
        />
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
