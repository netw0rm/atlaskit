import * as React from 'react';
import {Component} from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Button from '@atlaskit/button';

import {
  Overlay,
  Header
} from './styled';

export interface VideoCardOverlayProps {
  videoName?: string;
  onClose?: () => void;
}

export class VideoCardOverlay extends Component<VideoCardOverlayProps, {}> {
  static defaultProps = {
    videoName: '',
    allowClose: true
  };

  render() {
    const {videoName, onClose} = this.props;

    return (
      <Overlay>
        <Header>
          {videoName}
          <Button appearance="subtle-link" onClick={onClose}>
            <CrossIcon label="close widget" />
          </Button>
        </Header>
      </Overlay>
    );
  }
}
