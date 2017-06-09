import * as React from 'react';
import * as cx from 'classnames';
import {Component} from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';

import {CardDimensions} from '../../../index';
import {AudioControls} from './audioControls';
import {AudioBars} from './audioBars';
import {Audio, Wrapper} from '../styled';
import {Title, Marquee, ButtonWrapper} from './styled';

export interface AudioWidgetProps {
  audioSrc: string;
  dimensions: CardDimensions;
  title?: string;
  onClose?: () => void;
}

export interface AudioWidgetState {
  audioElement?: HTMLAudioElement;
  isPlaying: boolean;
}

export class AudioWidget extends Component<AudioWidgetProps, AudioWidgetState> {
  defaultProps = {
    onClose: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: true
    };
  }

  render() {
    const {title, audioSrc, dimensions, onClose} = this.props;
    const {audioElement, isPlaying} = this.state;

    const audioBars = audioElement
      ? <AudioBars audioEl={audioElement} dimensions={dimensions} />
      : null;

    const audioControls = audioElement
      ? <AudioControls audioEl={audioElement} />
      : null;
    const marqueClassName = cx({playing: isPlaying});

    return (
      <Wrapper style={{width: '100%', height: '100%'}}>
        <ButtonWrapper appearance="subtle-link" onClick={onClose}>
          <CrossIcon label="close widget" />
        </ButtonWrapper>
        <Title>
          <Marquee className={marqueClassName}>{title} -</Marquee>
          <Marquee className={marqueClassName}>{title}</Marquee>
        </Title>
        {audioControls}
        {audioBars}
        <Audio
          autoPlay={true}
          src={audioSrc}
          preload="auto"
          innerRef={this.onAudioMountOrUnmount}
          onEnded={this.onAudioEnded}
          onPause={this.onPause}
          onPlaying={this.onPlaying}
        />
      </Wrapper>
    );
  }

  private onAudioEnded = () => {
    const {audioElement} = this.state;
    if (audioElement) {
      audioElement.currentTime = 0;
    }
  }

  // TODO: Abstract CORS handling in a helper method
  private onAudioMountOrUnmount = (audioElement: HTMLAudioElement): void => {
    if (!audioElement) {
      return;
    }

    audioElement.crossOrigin = 'Anonymous'; // needed to get CORs to be happy
    this.setState({audioElement});
  }

  private onPause = () => {
    this.setState({isPlaying: false});
  }

  private onPlaying = () => {
    this.setState({isPlaying: true});
  }
}
