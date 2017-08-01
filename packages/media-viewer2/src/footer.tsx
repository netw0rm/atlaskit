import * as React from 'react';
import { PureComponent } from 'react';
import {MediaItem} from '@atlaskit/media-core';

export interface Props { 
  mediaItem: MediaItem;
}

export interface State {}

export class Footer extends PureComponent<Props, State> {
  render() {
    const mediaItem = this.props.mediaItem;
    return (
      <div>
        {mediaItem.details.id}
      </div>
    );
  }
}
