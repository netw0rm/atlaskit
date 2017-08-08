import * as React from 'react';
import {Component} from 'react';
import * as qs from 'query-string';
import * as throttle from 'lodash.throttle';
import {Context, FileItem} from '@atlaskit/media-core';
import {Wrapper, VideoContainer, ControlsWrapper} from './styled';
import {MediaIdentifier} from '../../domain';
import {MediaElement} from '../../components/MediaElement';
import {PlayerControls} from '../../components/PlayerControls';


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
  quality: 'sd' | 'hd';
  videoURLs: QualityURL;
  posterURLs: QualityURL;
  videoContainerWidth: number;
  playing: boolean;
  duration: number;
  time: number;
}

export class VideoViewer extends Component<VideoViewerProps, VideoViewerState> {

  videoContainerElement: HTMLDivElement;

  state: VideoViewerState = {
    quality: 'sd',
    videoURLs: {},
    posterURLs: {},
    videoContainerWidth: 0,
    playing: false,
    duration: 0,
    time: 0
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

  get videoURL(): string {
    const {quality, videoURLs} = this.state;
    return videoURLs[quality] || '';
  }

  get posterURL(): string {
    const {quality, posterURLs} = this.state;
    return posterURLs[quality] || '';
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

  handleChangeVideoContainerElement = element => {
    this.videoContainerElement = element;
    this.handleResizeWindow();
  }

  handleResizeWindow = throttle(() => this.updateVideoContainerWidth(), 100);

  handlePlay = () => this.setState({playing: true});
  handlePause = () => this.setState({playing: false});
  handleChangeQuality = quality => this.setState({quality});

  handlePlaybackChange = state => this.setState({playing: state === 'playing'});
  handleDurationChange = duration => this.setState({duration});
  handleTimeChange = time => this.setState({time});

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

  renderVideo() {
    const {playing} = this.state;
    return (
      <VideoContainer
        innerRef={this.handleChangeVideoContainerElement}
        style={{height: this.calcVideoContainerHeight()}}
      >
        <MediaElement
          src={this.videoURL}
          poster={this.posterURL}
          playing={playing}
          onPlaybackChange={this.handlePlaybackChange}
          onDurationChange={this.handleDurationChange}
          onTimeChange={this.handleTimeChange}
        />
      </VideoContainer>
    );
  }

  renderControls() {
    const {playing, duration, time, quality} = this.state;
    return (
      <ControlsWrapper>
        <PlayerControls
          playing={playing}
          duration={duration}
          time={time}
          quality={quality}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onChangeQuality={this.handleChangeQuality}
        />
      </ControlsWrapper>
    );
  }

  render() {
    return (
      <Wrapper>
        {this.renderVideo()}
        {this.renderControls()}
      </Wrapper>
    );
  }

}
