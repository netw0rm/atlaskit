import * as React from 'react';
import {Component} from 'react';
import {Context, FileItem} from '@atlaskit/media-core';
import Slider from '@atlaskit/field-range';
import {Wrapper, Video, ControlsWrapper} from './styled';
import {MediaIdentifier} from '../..';

export interface VideoViewerProps {
  identifier: MediaIdentifier;
  metadata: FileItem;
  context: Context;
}

export interface VideoViewerState {
  dataURI?: string;
}

export class VideoViewer extends Component<VideoViewerProps, VideoViewerState> {
  state:VideoViewerState = {

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

  componentWillReceiveProps(nextProps: VideoViewerProps) {
    if (nextProps.metadata.details.id === this.props.metadata.details.id) {
      return;
    }

    this.fetchDataURI(nextProps.metadata);
  }

  render() {
    const {dataURI} = this.state;

    return (
      <Wrapper>
        <Video src={dataURI} controls />
        <ControlsWrapper>
          <Slider
            value={20}
            min={0}
            max={100}
            onChange={this.onSliderChange}
          />
        </ControlsWrapper>
      </Wrapper>
    );
  }

  onSliderChange = () => {
    
  }
}