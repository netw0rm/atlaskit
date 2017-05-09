import * as React from 'react';
import {Component} from 'react';

import {CardDimensions} from '../../../../index';
import {BarsCanvas} from './styled';

export interface AudioBarsProps {
  // TODO use audioEl to figure out when you can avoid drawing
  audioEl: HTMLAudioElement;
  dimensions: CardDimensions;
}

export class AudioBars extends Component<AudioBarsProps, {}> {
  private canvasEl: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  private animationId: number;

  private audioCtx: AudioContext;
  private analyser: AnalyserNode;
  private gainNode: GainNode;
  private source: MediaElementAudioSourceNode;
  private dataArray: Uint8Array;
  private audioCtxClosingPromise: Promise<void>;

  constructor(props) {
    super(props);
    this.audioCtxClosingPromise = Promise.resolve();
  }

  componentWillUnmount() {
    this.stopAnimation();
    this.closeAnalyser();
  }

  componentDidMount() {
    const {audioEl} = this.props;

    this.analyse();

    audioEl.addEventListener('playing', this.onPlaying); // TODO: Stop draw
    audioEl.addEventListener('pause', this.onPause); // TODO: Stop draw
    audioEl.addEventListener('ended', this.onEnded); // TODO: Stop draw
  }

  render() {
    const {dimensions} = this.props;

    return (
      <BarsCanvas style={dimensions} innerRef={this.onCanvasElMountOrUnmount}/>
    );
  }

  private onCanvasElMountOrUnmount = (ref: HTMLCanvasElement): void => {
    if (!ref) {
      return;
    }

    this.canvasEl = ref;
  }

  private draw = (): void => {
    const context = this.canvasEl.getContext('2d');

    if (!context) {
      return;
    }

    this.canvasContext = context;

    this.width = this.canvasEl.width;
    this.height = this.canvasEl.height;

    const bufferLength = this.analyser.frequencyBinCount;

    this.dataArray = new Uint8Array(bufferLength);

    this.canvasContext.clearRect(0, 0, this.width, this.height);

    this.drawBars();
  }

  private analyse = (): void => {
    const {audioEl} = this.props;

    // required to get around compiler complaining about non-existance of window.webkitAudioContext
    const localWindow = window as any;
    this.audioCtx = new (localWindow.AudioContext || localWindow.webkitAudioContext)();

    this.source = this.audioCtx.createMediaElementSource(audioEl);

    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 256;

    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.value = 0.2;

    this.source.connect(this.analyser);
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.audioCtx.destination);
  }

  // TODO: Performance: we should only call this method when the audio is being played
  // TODO: Performance: we are painting way more bars that the ones that fits on the canvas,
  // we should only paint the visible ones
  private drawBars = (): void => {
    const {canvasContext, width, height, dataArray} = this;
    const bufferLength = dataArray.length;
    const maxBars = 30;
    const barHeightCorrection = 2.2;
    this.analyser.getByteFrequencyData(dataArray);

    canvasContext.fillStyle = '#EBECF0';
    canvasContext.fillRect(0, 0, width, height);

    const barWidth = (width / bufferLength) * 4;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      let barHeight = dataArray[i];
      const red = 87 + (barHeight * 1);

      canvasContext.fillStyle = `rgba(${red}, 175, 229, 1)`; // TODO: Play with alpha channel based on height?
      canvasContext.fillRect(x, height - barHeight / barHeightCorrection, barWidth, barHeight / barHeightCorrection);

      x += barWidth + 1;
      if (i > maxBars) {
        break;
      }
    }

    this.animationId = requestAnimationFrame(this.drawBars);
  }

  private stopAnimation = () => {
    window.cancelAnimationFrame(this.animationId);
  }

  // Closes AudioContext, theoreticaly we should only have one AudioContext at a time per page
  private closeAnalyser = () => {
    this.analyser.disconnect();
    this.source.disconnect();

    this.audioCtxClosingPromise.then(() => {
      this.audioCtxClosingPromise = this.audioCtx.close();
    });
  }

  private onPlaying = () => {
    this.draw();
  }

  private onPause = () => {
    this.stopAnimation();
  }

  private onEnded = () => {

  }
}
