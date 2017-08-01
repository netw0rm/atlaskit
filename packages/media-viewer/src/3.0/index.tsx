import * as React from 'react';
import {Component} from 'react';
import {Context, MediaItemType, MediaItem} from '@atlaskit/media-core';
import {ItemInfo, ItemPreview, ItemTools} from './views';
import {MainWrapper} from './styled';

export type CollectionName = string;
export interface Selection {
  selected: MediaIdentifier;
  list?: CollectionName | Array<MediaIdentifier>;
}

export interface MediaIdentifier {
  readonly mediaItemType: MediaItemType;
  readonly id: string;
  readonly collectionName: string;
}

export interface MediaViewerProps {
  context: Context;
  selection: Selection;
}

export interface MediaViewerState {
  metadata?: MediaItem;
  error?: any;
}

export class MediaViewer extends Component<MediaViewerProps, MediaViewerState> {
  subscription: any;
  state: MediaViewerState = {

  }

  componentDidMount(): void {
    const { context, selection } = this.props;
    const {id, mediaItemType, collectionName} = selection.selected;
    const provider = context.getMediaItemProvider(id, mediaItemType, collectionName);

    this.subscription = provider.observable().subscribe({
      next: (metadata: MediaItem) => {
        this.setState({ metadata });
      },
      error: (error) => {
        this.setState({error});
      }
    });
  }

  render() {
    const {metadata} = this.state;
    console.log('metadata', metadata);
    return (
      <MainWrapper>
        <ItemInfo metadata={metadata} />
        <ItemPreview />
        <ItemTools />
      </MainWrapper>
    );
  }
}