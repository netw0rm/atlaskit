import * as React from 'react';
import {PDFJS as PDFJSViewer} from 'pdfjs-dist/web/pdf_viewer.js';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import {ViewerTools} from '../../viewerTools';
import {Wrapper, ViewerContainer} from './styled';

export interface PDFViewProps {
  url?: string;
  error?: string;
  zoomLevel?: number;
  onLoadError?: () => void;
  onZoomOut?: () => void;
  onZoomIn?: () => void;
  onZoomFit?: () => void;
  onLoadError?: () => void;
}

export interface PDFViewState {
}

export class PDFView extends React.PureComponent<PDFViewProps, PDFViewState> {

  private containerElement: HTMLDivElement;

  private pdfViewer: PDFJSViewer.PDFViewer = null;
  private eventBusRef: any = null;

  async fetchDocument(url: string) {
    const loadingTask = pdfjsLib.getDocument(url);
    // const loadingTask = pdfjsLib.getDocument('http://local.atlassian.io:5001/pdf-document-t3n-colors.pdf');
    loadingTask.promise.then(
      (doc) => this.pdfViewer.setDocument(doc),
      (reason) => {console.error(`Error during loading: ${reason}`);
    });
  }

  handleContainerMount = element => {
    this.containerElement = element;
  }

  componentDidMount() {

    this.pdfViewer = new PDFJSViewer.PDFViewer({
      container: this.containerElement,
      // eventBus: this.eventBusRef,
    });

    const {url} = this.props;
    if (url) {
      this.fetchDocument(url);
    }

  }

  componentWillUpdate(nextProps) {
    const {url: currentUrl} = this.props;
    const {url: nextUrl} = nextProps;

    if (nextUrl !== currentUrl) {
      this.fetchDocument(nextUrl);
    }

  }

  render() {
    return (
      <Wrapper>
        {/* <ViewerTools
          onZoomOut={this.zoomOut}
          onZoomIn={this.zoomIn}
          onZoomFit={this.zoomFit}
          zoomLevel={this.state.scale * 100}
        /> */}
        <ViewerContainer innerRef={this.handleContainerMount}>
          <div className="pdfViewer" />
        </ViewerContainer>
      </Wrapper>
    );
  }
}
