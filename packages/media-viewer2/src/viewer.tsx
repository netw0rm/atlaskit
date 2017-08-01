import * as React from 'react';
import { PureComponent } from 'react';
import { Context, MediaItem } from '@atlaskit/media-core';

// VIEWERS
import {ImageViewer} from './viewers/image';

export interface Props {
  mediaItem: MediaItem;
  collectionName?: string;
  context: Context;
}

export interface State {}

export class Viewer extends PureComponent<Props, State> {
  render() {
    return (
      <ImageViewer
        context={this.props.context}
        mediaItem={this.props.mediaItem}
        collectionName={this.props.collectionName}
      />
    );
  }
}
