import * as React from 'react';
import {Video} from './styled';

export type PlaybackState = 'playing' | 'paused' | 'ended' | 'error';

export interface MediaElementProps {

  src: string;
  poster?: string;
  playing?: boolean;

  onPlaybackChange?: (state: PlaybackState) => void;
  onDurationChange?: (duration: number) => void;
  onTimeChange?: (currentTime: number) => void;

}

export interface MediaElementState {
}

export class MediaElement extends React.Component<MediaElementProps, MediaElementState> {

  mediaElement: HTMLMediaElement;

  handleElementMounted = element => this.mediaElement = element;

  handlePlaying = () => {
    const {onPlaybackChange} = this.props;
    if (onPlaybackChange) {
      onPlaybackChange('playing');
    }
  }

  handlePaused = () => {
    const {onPlaybackChange} = this.props;
    if (onPlaybackChange) {
      onPlaybackChange('paused');
    }
  }

  handleEnded = () => {
    const {onPlaybackChange} = this.props;
    if (onPlaybackChange) {
      onPlaybackChange('ended');
    }
  }

  handleError = () => {
    const {onPlaybackChange} = this.props;
    if (onPlaybackChange) {
      onPlaybackChange('error');
    }
  }

  handleDurationChange = event => {
    const {onDurationChange} = this.props;
    if (onDurationChange) {
      onDurationChange(event.target.duration);
    }
  }

  handleTimeChange = event => {
    const {onTimeChange} = this.props;
    if (onTimeChange) {
      onTimeChange(event.target.currentTime);
    }
  }

  play() {
    if (this.mediaElement) {
      this.mediaElement.play();
    }
  }

  pause() {
    if (this.mediaElement) {
      this.mediaElement.pause();
    }
  }

  seek(time: number) {
    if (this.mediaElement) {
      this.mediaElement.fastSeek(time);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {playing: currentPlaying = false} = this.props;
    const {playing: nextPlaying = false} = nextProps;

    if (this.mediaElement && currentPlaying !== nextPlaying) {
      if (nextPlaying) {
        this.play();
      } else {
        this.pause();
      }
    }

  }

  render() {
    const {src, poster} = this.props;
    return (
      <Video
        innerRef={this.handleElementMounted}
        preload="metadata"
        src={src}
        poster={poster}
        onPlaying={this.handlePlaying}
        onPause={this.handlePaused}
        onEnded={this.handleEnded}
        onError={this.handleError}
        onTimeUpdate={this.handleTimeChange}
        onDurationChange={this.handleDurationChange}
      />
    );
  }

}
