import * as React from 'react';
import {Component} from 'react';
import {FileItem, Context} from '@atlaskit/media-core';
import {ImageViewer} from '../viewers';
// import {Selection} from '..';

import {ItemPreviewWrapper} from './styled';

export interface ItemPreviewProps {
  metadata: FileItem;
  context: Context;
  // collectionName: string;
  // selection: Selection;
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
    // TODO: use metadata.details.mediaType to chose the right viewer
    const {context, metadata} = this.props;
    console.log('renderViewer', metadata.details.id)
    return (
      <ImageViewer context={context} metadata={metadata} identifier={} />
    );
  }
}