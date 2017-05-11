import * as React from 'react';
import {Component} from 'react';
import VidPlayIcon from '@atlaskit/icon/glyph/vid-play';

import {PlayButtonWrapper, Circle, PlayButtonIcon as PlayButtonContainer} from './styled';

export interface PlayButtonProps {
  onClick?: () => void;
}

export class PlayButton extends Component<PlayButtonProps, {}> {
  render() {
    return (
      <PlayButtonWrapper className="play-button-wrapper" onClick={this.props.onClick}>
        <Circle className="circle"/>
        <PlayButtonContainer >
          <VidPlayIcon label="open widget" />
        </PlayButtonContainer>
      </PlayButtonWrapper>
    );
  }
}
