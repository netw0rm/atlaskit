import * as React from 'react';
import {Component} from 'react';
import {Context, FileItem} from '@atlaskit/media-core';
import {Wrapper, Audio} from './styled';
import {MediaIdentifier} from '../../domain';

export interface AudioViewerProps {
  identifier: MediaIdentifier;
  metadata: FileItem;
  context: Context;
}

export interface AudioViewerState {
  dataURI?: string;
}

export class AudioViewer extends Component<AudioViewerProps, AudioViewerState> {

  state: AudioViewerState = {

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

  componentWillReceiveProps(nextProps: AudioViewerProps) {
    if (nextProps.metadata.details.id === this.props.metadata.details.id) {
      return;
    }

    this.fetchDataURI(nextProps.metadata);
  }

  render() {
    const {dataURI} = this.state;

    return (
      <Wrapper>
        <Audio src={dataURI} controls={true} />
      </Wrapper>
    );
  }
}
