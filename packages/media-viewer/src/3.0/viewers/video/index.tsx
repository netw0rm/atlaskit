import * as React from 'react';
import {Component} from 'react';
import * as throttle from 'lodash.throttle';
import {Context, FileItem} from '@atlaskit/media-core';
import Slider from '@atlaskit/field-range';
import {Wrapper, VideoContainer, Video, ControlsWrapper} from './styled';
import {MediaIdentifier} from '../../domain';
import {getAPIURL} from '../../utils';

export interface QualityURL {
  sd?: string;
  hd?: string;
}

export interface VideoViewerProps {
  identifier: MediaIdentifier;
  metadata: FileItem;
  context: Context;
}

export interface VideoViewerState {
  quality: string;
  videoURLs: QualityURL;
  posterURLs: QualityURL;
  videoContainerWidth: number;
}

export class VideoViewer extends Component<VideoViewerProps, VideoViewerState> {

  videoContainerElement: HTMLDivElement;

  state: VideoViewerState = {
    quality: 'sd',
    videoURLs: {},
    posterURLs: {},
    videoContainerWidth: 0
  };

  async getPosterURLs(): Promise<QualityURL> {
    const {metadata, identifier, context} = this.props;
    if (!metadata || !metadata.details || !metadata.details.artifacts) {
      return Promise.resolve({});
    }
    const artifacts = metadata.details.artifacts;
    return Promise.all([
      artifacts['video.mp4'] ? getAPIURL(artifacts['poster.jpg'].url, context, identifier.collectionName) : Promise.resolve(undefined),
      artifacts['video_hd.mp4'] ? getAPIURL(artifacts['poster_hd.jpg'].url, context, identifier.collectionName) : Promise.resolve(undefined)
    ])
      .then(urls => {
        const [sd, hd] = urls;
        return {sd, hd};
      })
    ;
  }

  getVideoURLs(): Promise<QualityURL> {
    const {metadata, identifier, context} = this.props;
    if (!metadata || !metadata.details || !metadata.details.artifacts) {
      return Promise.resolve({});
    }
    const artifacts = metadata.details.artifacts;
    return Promise.all([
      artifacts['video.mp4'] ? getAPIURL(artifacts['video.mp4'].url, context, identifier.collectionName) : Promise.resolve(undefined),
      artifacts['video_hd.mp4'] ? getAPIURL(artifacts['video_hd.mp4'].url, context, identifier.collectionName) : Promise.resolve(undefined)
    ])
      .then(urls => {
        const [sd, hd] = urls;
        return {sd, hd};
      })
    ;
  }

  calcVideoContainerHeight() {
    const {videoContainerWidth} = this.state;
    if (!videoContainerWidth) {
      return 'auto';
    }
    return videoContainerWidth / 1280 * 720;
  }

  updateVideoContainerWidth() {
    if (this.videoContainerElement) {
      this.setState({
        videoContainerWidth: this.videoContainerElement ? this.videoContainerElement.clientWidth : 0
      });
    }
  }

  handleChangeVideoElement = element => {
    this.videoContainerElement = element;
    this.handleResizeWindow();
  }

  handleResizeWindow = throttle(() => this.updateVideoContainerWidth(), 100);

  componentDidMount() {

    Promise.all([
      this.getVideoURLs(),
      this.getPosterURLs()
    ])
      .then(urls => {
        this.setState({
          videoURLs: urls[0],
          posterURLs: urls[1]
        });
      })
    ;

    window.addEventListener('resize', this.handleResizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResizeWindow);
  }

  render() {
    const {quality, videoURLs, posterURLs} = this.state;
    // TODO: Add ADG3 controls, see what features from video.js do we need
    return (
      <Wrapper>
        <VideoContainer innerRef={this.handleChangeVideoElement} style={{height: this.calcVideoContainerHeight()}}>
          <Video src={videoURLs[quality] || ''} controls={true} poster={posterURLs[quality] || ''}/>
        </VideoContainer>
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
