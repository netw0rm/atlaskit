import * as React from 'react';
import {Component} from 'react';
import VidPlayIcon from '@atlaskit/icon/glyph/vid-play';
import VidPauseIcon from '@atlaskit/icon/glyph/vid-pause';

import {PlayButtonWrapper, PlayCanvas} from './styled';

export interface AudioControlsProps {
  audioEl: HTMLAudioElement;
}

export interface AudioControlsState {
  isPlaying: boolean;
}

export class AudioControls extends Component<AudioControlsProps, AudioControlsState> {
  private canvasEl: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D | null;
  private animationId: number;

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: true
    };
  }

  componentDidMount() {
    this.props.audioEl.addEventListener('ended', this.onAudioEnded);
  }

  componentWillUnmount() {
    this.stopAnimation();
  }

  render() {
    const button = this.state.isPlaying ?
      <VidPauseIcon size="large" label="pause"/> :
      <VidPlayIcon size="large" label="play"/>;

    return (
      <div>
        <PlayButtonWrapper onClick={this.toggleAudio}>
          {button}
        </PlayButtonWrapper>,
        <PlayCanvas key={1} innerRef={this.onCanvasElMountOrUnmount} />
      </div>
    );
  }

  private onCanvasElMountOrUnmount = (ref: HTMLCanvasElement): void => {
    if (!ref) {
      return;
    }

    this.canvasEl = ref;
    this.canvasContext = this.canvasEl.getContext('2d');
    this.draw();
  }

  private draw = (): void => {
    const {canvasContext: context} = this;
    const {audioEl} = this.props;

    if (!context) {
      return;
    }

    const isPlayerAtStart = audioEl.currentTime === 0;
    const percentage = isPlayerAtStart ? 100 : (audioEl.currentTime * 100) / audioEl.duration;
    const fullArc = Math.PI * 2;
    const arcPencentage = (percentage * fullArc) / 100;

    const {width, height} = this.canvasEl;
    context.clearRect(0, 0, width, height);

    context.lineWidth = 15;
    context.strokeStyle = 'white';
    context.beginPath();
    context.arc(width / 2, height / 2, 50, 0, fullArc, true);
    context.closePath();
    context.stroke();
    context.strokeStyle = '#4c5b76'; // TODO: get color from AGD3
    context.beginPath();
    context.arc(width / 2, height / 2, 50, 0, arcPencentage, true);
    context.stroke();

    this.animationId = requestAnimationFrame(this.draw);
  }

  private stopAnimation = () => {
    window.cancelAnimationFrame(this.animationId);
  }

  private toggleAudio = (): void => {
    const {audioEl} = this.props;
    const {isPlaying} = this.state;

    if (audioEl.paused) {
      audioEl.play();
    } else {
      audioEl.pause();
    }

    this.setState({isPlaying: !isPlaying});
  }

  private onAudioEnded = (): void => {
    this.setState({isPlaying: false});
  }
}
