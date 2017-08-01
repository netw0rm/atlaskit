import * as React from 'react';
import { PureComponent } from 'react';
import { HeaderWrapper } from './styled';
import {MediaItem} from '@atlaskit/media-core';

export interface Props {
  mediaItem: MediaItem;
}

export interface State {}

export class Header extends PureComponent<Props, State> {
  render() {
    const mediaItem = this.props.mediaItem;
    return (
      <HeaderWrapper>
        {mediaItem.details.id}
      </HeaderWrapper>
    );
  }
}
