import * as React from 'react';
import * as cx from 'classnames';
import {Component} from 'react';
import {CardAction} from '@atlaskit/media-core';

import Widget from '../widget';
import {AudioWidget} from './audioWidget';
import {CardDimensions} from '../../index';
import {PlayButton} from '../playButton';
import {CardOverlay} from '../cardImageView/cardOverlay';
import {Wrapper, Audio, AudioBarsWrapper} from './styled';
import {MediaImage} from '../mediaImage';
import {AudioBars} from './audioWidget/audioBars';

export interface CardAudioViewProps {
  audioUrl: Promise<string>;
  title?: string;
  subtitle?: string;

  // TODO use of remove these properties
  dataURI?: string;
  dimensions?: CardDimensions;

  actions?: Array<CardAction>;
}

export interface CardAudioViewState {
  isPlaying: boolean;
  isHovering: boolean;
  audioSrc: string;
  audioElement?: HTMLAudioElement;
}

export class CardAudioView extends Component<CardAudioViewProps, CardAudioViewState> {
  private dimensions: CardDimensions;

  constructor(props: CardAudioViewProps) {
    super(props);

    this.dimensions = {width: '200px', height: '150px'};

    this.state = {
      audioSrc: '',
      isPlaying: false,
      isHovering: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const {audioUrl: currentAudioUrl} = this.props;
    const {audioUrl: nextAudioUrl} = nextProps;

    if (currentAudioUrl !== nextAudioUrl) {
      this.updateAudioSrc();
      this.removeWidget();
    }
  }

  componentDidMount() {
    this.updateAudioSrc();
  }

  private updateAudioSrc(): void {
    this.setState({audioSrc: ''});

    this.props.audioUrl.then(audioSrc => {
      this.setState({audioSrc});
    });
  }

  render() {
    if (!this.state.audioSrc) {
      // TODO: Show loading state
    }

    // TODO: Add logic to show dataURI as video poster instead of the default video element
    const {title, subtitle, actions, dataURI, dimensions} = this.props;
    const {audioSrc, audioElement, isHovering} = this.state;
    const persistent = !dataURI;
    const previewImg = dataURI ? <MediaImage dataURI={dataURI} /> : null;
    const audioBarsClass = cx({visible: isHovering});
    const audioBars = audioElement
      ? <AudioBarsWrapper className={audioBarsClass}><AudioBars audioEl={audioElement} dimensions={dimensions || {width: '100%', height: '100%'}} /></AudioBarsWrapper>
      : null;

    return (
      <Wrapper onMouseOver={this.startBars} onMouseLeave={this.stopBars}  onClick={this.makeWidget}>
        {previewImg}
        {audioBars}
        <CardOverlay
          persistent={persistent}
          mediaName={title}
          mediaType="audio"
          subtitle={subtitle}
          actions={actions}
        />
        <PlayButton/>
        <Audio src={audioSrc} innerRef={this.onAudioMountOrUnmount} />
      </Wrapper>
    );
  }

  private makeWidget = (): void => {
    const {title} = this.props;
    const options = {
      dimensions: this.dimensions,
      enableResizing: false
    };

    Widget.add(
      <AudioWidget audioSrc={this.state.audioSrc} onClose={this.removeWidget} title={title} dimensions={this.dimensions} />,
      options
   );
  }

  private removeWidget(): void {
    Widget.remove();
  }

  private onAudioMountOrUnmount = (audioElement: HTMLAudioElement): void => {
    if (!audioElement) {
      return;
    }

    audioElement.volume = 0.1; // We can't use "muted" attribute on audio element since won't emit data for the Bars component to visualyse
    audioElement.crossOrigin = 'Anonymous'; // needed to get CORs to be happy
    this.setState({audioElement});
  }

  private startBars = (): void => {
    this.setState({isHovering: true});

    const {audioElement} = this.state;
    if (audioElement) {
      audioElement.play();
    }
  }

  private stopBars = (): void => {
    this.setState({isHovering: false});

    const {audioElement} = this.state;
    if (audioElement) {
      audioElement.pause();
    }
  }
}
