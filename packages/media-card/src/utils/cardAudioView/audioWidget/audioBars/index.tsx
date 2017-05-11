/**
 * TODO: How can we properly test this component?
 * Problem right now is that this component just wraps a canvas element and draws audio data there.
 * Maybe extract drawing methods/logic and unit test them?
 */
import * as React from 'react';
import {Component} from 'react';

import {CardDimensions} from '../../../../index';
import {BarsCanvas} from './styled';

export interface AudioBarsProps {
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

    audioEl.addEventListener('playing', this.onPlaying);
    audioEl.addEventListener('pause', this.onPause);
    audioEl.addEventListener('ended', this.onEnded);
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
    this.analyser.fftSize = 256; // TODO: Probably we can decrease this number and get less data since we are limiting the number of bars on the canvas

    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.value = 0.2;

    this.source.connect(this.analyser);
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.audioCtx.destination);
  }

  private drawBars = (): void => {
    const {canvasContext, width, height, dataArray} = this;
    const bufferLength = dataArray.length;
    const maxBars = 30; // huge perf win here: we are limiting the number of painted bars to 30 as we don't fit more right now 🚀
    const barHeightCorrection = 2.2;
    this.analyser.getByteFrequencyData(dataArray);

    canvasContext.fillStyle = '#EBECF0'; // TODO: Use AK color?
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

  // TODO: Stop draw 😅
  private onEnded = () => {

  }
}
