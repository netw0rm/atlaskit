import * as React from 'react';
import {Component} from 'react';
import {Context, FileItem} from '@atlaskit/media-core';
import {Wrapper} from './styled';
import {MediaIdentifier} from '../../domain';
import {ItemTools} from '../../views/itemTools';

import Viewer from './viewer';
import * as pdfjsLib from 'pdfjs-dist/webpack';

export interface PdfViewerProps {
  identifier: MediaIdentifier;
  metadata: FileItem;
  context: Context;
}

export interface PdfViewerState {
  dataURI?: string;
  scale: number;
  page: number;
  error: any; // TODO:
  pages?: any; // TODO?
}

export class PdfViewer extends Component<PdfViewerProps, PdfViewerState> {
  constructor(props: any){
      super(props);
  }

  private defaultScale: number = 1;
  private viewer: any = null;

  state: PdfViewerState = {
    scale: this.defaultScale,
    page: 1,
    error: null
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
    getBinaryURL(metadata, context, identifier.collectionName).then((dataURI) => {
      this.setState({
        dataURI,
        error: null
      });
    });
  }

  loadDocument() {
    const loadingTask = pdfjsLib.getDocument(this.state.dataURI);
    // const loadingTask = pdfjsLib.getDocument('http://local.atlassian.io:5001/pdf-document-t3n-colors.pdf');
    loadingTask.promise.then((doc) => {
      this.viewer.setState({ doc });
    }, (reason) => {
      console.error(`Error during loading: ${reason}`);
    });
  }

  displayScaleChanged = (e: any) => {
    this.setState({
      scale: e.scale
    });
  }

  zoomIn = (e: any) => {
    const {scale} = this.viewer.state;
    if (scale >= 8) { return; }
    this.viewer.setState({
      scale: scale + 0.1
    });
  }
  zoomOut = (e: any) => {
    const {scale} = this.viewer.state;
    if (scale <= 0.4) { return; }
    this.viewer.setState({
      scale: scale - 0.1
    });
  }

  zoomFit = (e: any) => {
    this.viewer.setState({
      scale: 1
    });
  }

  setViewerRef = (ref: any) => {
    this.viewer = ref;
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
          ref={this.setViewerRef}
        />
      </Wrapper>
    );
  }
}
