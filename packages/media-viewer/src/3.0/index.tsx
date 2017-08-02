import * as React from 'react';
import {Component} from 'react';
import {Context, MediaItemType, FileItem} from '@atlaskit/media-core';
import {ItemInfo, ItemPreview, ItemTools, Navigation} from './views';
import {MainWrapper} from './styled';

// TODO: Move common types/interfaces to "domain" folder
export type CollectionName = string;
export interface NavigationConfig {
  initialItem: MediaIdentifier;
  list?: Array<MediaIdentifier>;
  collectionName?: CollectionName;
}

export interface MediaIdentifier {
  readonly mediaItemType: MediaItemType;
  readonly id: string;
  readonly collectionName: string;
}

export interface MediaViewerProps {
  context: Context;
  navigation: NavigationConfig;
  onPreviewChanged?: (item: MediaIdentifier) => void;
}

export interface MediaViewerState {
  currentItem?: MediaIdentifier;
  metadata?: FileItem;
  error?: any;
}

export class MediaViewer extends Component<MediaViewerProps, MediaViewerState> {
  subscription: any;
  state: MediaViewerState = {

  }

  fetchMetadata(item: MediaIdentifier) {
    const { context } = this.props;
    const {id, mediaItemType, collectionName} = item;
    const provider = context.getMediaItemProvider(id, mediaItemType, collectionName);

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = provider.observable().subscribe({
      next: (metadata: FileItem) => {
        console.log('fetchMetada', metadata)
        this.setState({ metadata });
      },
      error: (error) => {
        this.setState({error});
      }
    });
  }

  componentDidMount(): void {
    const {initialItem} = this.props.navigation;
    this.fetchMetadata(initialItem);
  }

  render() {
    const {metadata, currentItem} = this.state;
    const {context, navigation} = this.props;
    const selected = currentItem || navigation.initialItem;
    // TODO: Who handles collection navigation?
    // TODO: deal with navigation.collectionName

    return (
      <MainWrapper>

        <Navigation 
          list={navigation.list || []} 
          selected={selected} 
          onNext={this.navigate('next')}
          onPrev={this.navigate('prev')}
          />

        <ItemInfo metadata={metadata} />
        {metadata ? 
          <ItemPreview
            context={context}
            metadata={metadata}
          /> : undefined}
        <ItemTools />

      </MainWrapper>
    );
  }

  navigate = (direction) => {
    return (item: MediaIdentifier) => {
      this.setState({currentItem: item});
      this.fetchMetadata(item);
    };
  }
}