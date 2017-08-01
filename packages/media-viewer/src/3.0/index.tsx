import * as React from 'react';
import {Component} from 'react';
import {Context, MediaItemType, FileItem} from '@atlaskit/media-core';
import {ItemInfo, ItemPreview, ItemTools} from './views';
import {MainWrapper} from './styled';

// TODO: Move common types/interfaces to "domain" folder
export type CollectionName = string;
export type List = CollectionName | Array<MediaIdentifier>;
export interface Selection {
  selected: MediaIdentifier;
  list?: List;
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
  metadata?: FileItem;
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
      next: (metadata: FileItem) => {
        this.setState({ metadata });
      },
      error: (error) => {
        this.setState({error});
      }
    });
  }

  render() {
    const {metadata} = this.state;
    const {context, selection: {selected: {collectionName}}, selection: {list}} = this.props;
    // TODO: Who handles collection navigation?

    return (
      <MainWrapper>
        <ItemInfo metadata={metadata} />
        {metadata ? <ItemPreview context={context} metadata={metadata} list={list} collectionName={collectionName} /> : undefined}
        <ItemTools />
      </MainWrapper>
    );
  }
}