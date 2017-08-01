import * as React from 'react';
import { PureComponent } from 'react';
import { Context, MediaItem } from '@atlaskit/media-core';

export interface Props {
  collectionName?: string;
  mediaItem: MediaItem;
  context: Context;
}

export interface State {}

export class PDFViewer extends PureComponent<Props, State> {
  render() {
    return (
      <div>
        PDF viewer
      </div>
    );
  }
}
