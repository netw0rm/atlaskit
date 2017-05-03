import * as React from 'react';
import {Component} from 'react';
import {CardAction} from '@atlaskit/media-core';

import {CardDimensions} from '../../index';
import {Wrapper, Video} from './styled';
import {PlayButton} from '../playButton';
import {CardOverlay} from '../cardImageView/cardOverlay';
import {VideoCardOverlay} from './videoOverlay';
import Widget from '../widget';

export interface CardVideoViewProps {
  videoUrl: Promise<string>;
  title?: string;
  subtitle?: string;

  // TODO use of remove these properties
  dataURI?: string;
  dimensions?: CardDimensions;

  actions?: Array<CardAction>;
}

export interface CardVideoViewState {
  videoSrc: string;
}

export class CardVideoView extends Component<CardVideoViewProps, CardVideoViewState> {
  private dimensions?: CardDimensions;
  private videoElement: HTMLVideoElement;
  private playPromise: Promise<void>;

  constructor(props: CardVideoViewProps) {
    super(props);

    this.state = {
      videoSrc: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const {videoUrl: currentVideoUrl} = this.props;
    const {videoUrl: nextVideoUrl} = nextProps;

    if (currentVideoUrl !== nextVideoUrl) {
      this.dimensions = undefined;
      this.updateVideoSrc();
    }
  }

  componentDidMount() {
    this.updateVideoSrc();
  }

  private updateVideoSrc(): void {
    this.setState({videoSrc: ''});

    this.props.videoUrl.then(videoSrc => {
      this.setState({videoSrc});
    });
  }

  render() {
    if (!this.state.videoSrc) {
      // TODO: Show loading state
    }

    // TODO: Add logic to show dataURI as video poster instead of the default video element
    const {title, subtitle, actions} = this.props;
    const {videoSrc} = this.state;

    return (
      <Wrapper onMouseOver={this.startInlineVideo} onMouseLeave={this.stopInlineVideo} onClick={this.makeWidget}>
        <CardOverlay
          persistent={false}
          mediaName={title}
          mediaType="video"
          subtitle={subtitle}
          actions={actions}
        />
        <PlayButton/>
        <Video
          innerRef={(ref) => this.videoElement = ref}
          src={videoSrc}
          loop
          muted
          preload="metadata"
          onLoadedMetadata={this.updateVideoDimensions}
        />
      </Wrapper>
    );
  }

  private makeWidget = (): void => {
    if (!this.dimensions) {
      return;
    }

    const {title} = this.props;
    const {videoSrc} = this.state;

    const widgetComponent = (
      <Wrapper style={{width: '100%', height: '100%'}}>
        <VideoCardOverlay
          videoName={title}
          onClose={this.handleWidgetClose}
        />
        <Video autoPlay loop src={videoSrc} preload="metadata" controls />
      </Wrapper>
    );

    Widget.add(widgetComponent, {dimensions: this.dimensions});
  }

  private updateVideoDimensions = (evt): void => {
    const videoEl = evt.target;
    this.dimensions = {
      width: videoEl.videoWidth,
      height: videoEl.videoHeight
    };
  }

  private handleWidgetClose = (): void => {
    Widget.remove();
  }

  private startInlineVideo = (): void => {
    this.playPromise = this.videoElement.play();
  }

  private stopInlineVideo = (): void => {
    this.playPromise.then(() => this.videoElement.pause());
  }
}

export default CardVideoView;
