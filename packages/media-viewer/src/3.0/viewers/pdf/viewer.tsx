import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {PDFJS as PDFJSViewer} from 'pdfjs-dist/web/pdf_viewer.js';
import { ViewerContainer } from './styled';

export interface PdfViewerProps {
  onInit?: PropTypes.func;
  onScaleChanged: PropTypes.func;
}

export interface PdfViewerState {
  doc: string | null;
  scale: number | null;
}

class Viewer extends Component<PdfViewerProps, PdfViewerState> {
  constructor(props) {
    super(props);
    this.initEventBus();
  }

  private pdfViewer: any = null;
  private eventBusRef: any = null;

  state: PdfViewerState = {
    doc: null,
    scale: null
  };

  initEventBus() {
    let eventBus = new PDFJSViewer.EventBus();
    eventBus.on('pagesinit', (e) => {
      this.setState({
        scale: this.pdfViewer.currentScale
      });
      if (this.props.onInit) {
        this.props.onInit({});
      }
      if (this.props.onScaleChanged) {
        this.props.onScaleChanged({scale: this.state.scale});
      }
    });
    eventBus.on('scalechange', (e) => {
      if (this.props.onScaleChanged) {
        this.props.onScaleChanged({scale: e.scale});
      }
    });
    this.eventBusRef = eventBus;
  }

  componentDidMount() {
    let viewerContainer = ReactDOM.findDOMNode(this);
    this.pdfViewer = new PDFJSViewer.PDFViewer({
      container: viewerContainer,
      eventBus: this.eventBusRef,
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.doc !== nextState.doc) {
      this.pdfViewer.setDocument(nextState.doc);
    }
    if (this.state.scale !== nextState.scale) {
      this.pdfViewer.currentScale = nextState.scale;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.doc !== nextState.doc ||
        this.state.scale !== nextState.scale) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <ViewerContainer>
        <div className="pdfViewer" />
      </ViewerContainer>
    );
  }
}

export default Viewer;
