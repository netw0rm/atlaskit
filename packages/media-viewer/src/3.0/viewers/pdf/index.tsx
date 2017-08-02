import * as React from 'react';
import {Component} from 'react';
import {Context, FileItem} from '@atlaskit/media-core';
import {Wrapper} from './styled';
import {MediaIdentifier} from '../..';

export interface PdfViewerProps {
  identifier: MediaIdentifier;
  metadata: FileItem;
  context: Context;
}

export interface PdfViewerState {
  dataURI?: string;
}

export class PdfViewer extends Component<PdfViewerProps, PdfViewerState> {
  state:PdfViewerState = {

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

  componentWillReceiveProps(nextProps: PdfViewerProps) {
    if (nextProps.metadata.details.id === this.props.metadata.details.id) {
      return;
    }

    this.fetchDataURI(nextProps.metadata);
  }

  render() {
    const {dataURI} = this.state;

    return (
      <Wrapper>
        PDF
      </Wrapper>
    );
  }
}