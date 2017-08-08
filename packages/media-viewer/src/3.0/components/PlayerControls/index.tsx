import * as React from 'react';
import Button from '@atlaskit/button';
import Slider from '@atlaskit/field-range';
import PlayIcon from '@atlaskit/icon/glyph/vid-play';
import PauseIcon from '@atlaskit/icon/glyph/vid-pause';
import HDIcon from '@atlaskit/icon/glyph/vid-hd-circle';
import {Wrapper, Grid, Col, Time, Duration} from './styled';

export interface PlayerControlsProps {

  playing?: boolean;
  duration?: number;
  elapsed?: number;
  volume?: number;
  quality: 'sd' | 'hd';

  onPlay?: () => void;
  onPause?: () => void;
  onSeek?: (time: number) => void;
  onChangeVolume?: (volume: number) => void;
  onChangeQuality?: (quality: 'sd' | 'hd') => void;
  onEnterFullscreen?: () => void;

}

export interface PlayerControlsState {
}

export class PlayerControls extends React.Component<PlayerControlsProps, PlayerControlsState> {

  formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.round(time - min); // TODO: always show 2s
    return `${min}:${String(sec).length < 2 ? '0' : ''}${sec}`;
  }

  handleSeek = event => {
    const {onSeek} = this.props;
    if (onSeek) {
      onSeek(event.target.value);
    }
  }

  handlePlayPause = () => {
    const {playing, onPlay, onPause} = this.props;
    if (!playing && onPlay) {
      onPlay();
    } else if (playing && onPause) {
      onPause();
    }
  }

  handleQuality = () => {
    const {quality = 'sd', onChangeQuality} = this.props;
    if (onChangeQuality) {
      onChangeQuality(quality === 'hd' ? 'sd' : 'hd');
    }
  }

  renderSlider() {
    const {duration = 0, elapsed = 0} = this.props;
    return (
      <Slider
        step={0.1}
        min={0}
        max={duration * 1000}
        value={elapsed * 1000}
        onChange={this.handleSeek}
      />
    );
  }

  renderPlayPauseButton() {
    const {playing} = this.props;
    return (
      <Button
        theme="dark"
        appearance="subtle"
        iconBefore={playing ? <PauseIcon label="pause" /> : <PlayIcon label="play" />}
        onClick={this.handlePlayPause}
      />
    );
  }

  renderTime() {
    const {duration = 0, elapsed = 0} = this.props;
    return (
      <span>
        <Time>{this.formatTime(elapsed)}</Time> <Duration>/ {this.formatTime(duration)}</Duration>
      </span>
    );
  }

  renderQuality() {
    const {quality = 'sd'} = this.props;
    return (
      <Button
        theme="dark"
        appearance="subtle"
        iconBefore={<HDIcon label="quality" size="large"/>}
        isSelected={quality === 'hd'}
        onClick={this.handleQuality}
      />
    );
  }

  render() {
    return (
      <Wrapper>
        {this.renderSlider()}
        <Grid>
          <Col>
            {this.renderPlayPauseButton()}
          </Col>
          <Col>
            {this.renderTime()}
            {this.renderQuality()}
          </Col>
        </Grid>
      </Wrapper>
    );
  }

}
