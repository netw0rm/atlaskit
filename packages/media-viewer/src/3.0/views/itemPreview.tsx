import * as React from 'react';
import {Component} from 'react';
import {FileItem, Context} from '@atlaskit/media-core';
import {ImageViewer, VideoViewer} from '../viewers';
import {MediaIdentifier} from '..';

import {ItemPreviewWrapper} from './styled';

export interface ItemPreviewProps {
  metadata: FileItem;
  context: Context;
  identifer: MediaIdentifier;
}

export interface ItemPreviewState {
  
}

export class ItemPreview extends Component<ItemPreviewProps, ItemPreviewState> {
  state:ItemPreviewState = {

  }

  render() {
    return (
      <ItemPreviewWrapper>
        {this.renderViewer()}
      </ItemPreviewWrapper>
    );
  }

  renderViewer() {
    const {context, metadata, identifer} = this.props;
    const mediaType = metadata.details.mediaType;
    let viewer;

    if (mediaType === 'image') {
      viewer = <ImageViewer context={context} metadata={metadata} identifier={identifer} />;
    } else if (mediaType === 'video') {
      viewer = <VideoViewer context={context} metadata={metadata} identifier={identifer} />;
    }

    return viewer;
  }
}