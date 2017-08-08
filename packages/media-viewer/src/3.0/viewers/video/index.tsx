import * as React from 'react';
import {Component} from 'react';
import * as throttle from 'lodash.throttle';
import {Context, FileItem} from '@atlaskit/media-core';
import {Wrapper, VideoContainer, ControlsWrapper} from './styled';
import {MediaIdentifier} from '../../domain';
import {MediaElement} from '../../components/MediaElement';
import {PlayerControls} from '../../components/PlayerControls';
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
  quality: 'sd' | 'hd';
  videoURLs: QualityURL;
  posterURLs: QualityURL;
  videoContainerWidth: number;
  playing: boolean;
  duration: number;
  elapsed: number;
  volume: number;
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
    elapsed: 0,
    volume: 0
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
  handleSeek = elapsed => this.setState({elapsed});
  handleChangeQuality = quality => this.setState({quality});
  handleChangeVolume = volume => this.setState({volume});

  handlePlaybackChange = state => this.setState({playing: state === 'playing'});
  handleDurationChange = duration => this.setState({duration});
  handleElapsedChange = elapsed => this.setState({elapsed});

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
          onTimeChange={this.handleElapsedChange}
        />
      </VideoContainer>
    );
  }

  renderControls() {
    const {playing, duration, elapsed, quality} = this.state;
    return (
      <ControlsWrapper>
        <PlayerControls
          playing={playing}
          duration={duration}
          elapsed={elapsed}
          quality={quality}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onSeek={this.handleSeek}
          onChangeQuality={this.handleChangeQuality}
          onChangeVolume={this.handleChangeVolume}
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
