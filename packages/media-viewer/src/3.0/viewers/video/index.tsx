import * as React from 'react';
import {Component} from 'react';
import * as qs from 'query-string';
import * as throttle from 'lodash.throttle';
import {Context, FileItem} from '@atlaskit/media-core';
import Slider from '@atlaskit/field-range';
import {Wrapper, VideoContainer, Video, ControlsWrapper} from './styled';
import {MediaIdentifier} from '../../domain';

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

  // TODO: we should move all logic for extracting metadata and fetching urls etc into a higher layer
  async getAPIURL(url: string): Promise<string> {
    const {context, identifier} = this.props;

    const collectionName = identifier.collectionName;

    // get a new token
    const token = await context.config.tokenProvider(collectionName);

    // extract the query string parameters
    const queryStringIndex = url.indexOf('?');
    let urlPath = url;
    let urlParams = {};
    if (queryStringIndex !== -1) {
      urlPath = url.substr(0, queryStringIndex);
      urlParams = qs.parse(url.substr(queryStringIndex + 1));
    }

    // update the query string parameters
    urlParams.client = context.config.clientId;
    urlParams.collection = collectionName;
    urlParams.token = token;

    const prefix = context.config.serviceHost;
    return `${prefix}${url}?${qs.stringify(urlParams)}`;
  }

  async getPosterURLs(): Promise<QualityURL> {
    const {metadata} = this.props;
    if (!metadata || !metadata.details || !metadata.details.artifacts) {
      return Promise.resolve({});
    }
    const artifacts = metadata.details.artifacts;
    return Promise.all([
      artifacts['video.mp4'] ? this.getAPIURL(artifacts['poster.jpg'].url) : Promise.resolve(undefined),
      artifacts['video_hd.mp4'] ? this.getAPIURL(artifacts['poster_hd.jpg'].url) : Promise.resolve(undefined)
    ])
      .then(urls => {
        const [sd, hd] = urls;
        return {sd, hd};
      })
    ;
  }

  getVideoURLs(): Promise<QualityURL> {
    const {metadata} = this.props;
    if (!metadata || !metadata.details || !metadata.details.artifacts) {
      return Promise.resolve({});
    }
    const artifacts = metadata.details.artifacts;
    return Promise.all([
      artifacts['video.mp4'] ? this.getAPIURL(artifacts['video.mp4'].url) : Promise.resolve(undefined),
      artifacts['video_hd.mp4'] ? this.getAPIURL(artifacts['video_hd.mp4'].url) : Promise.resolve(undefined)
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
