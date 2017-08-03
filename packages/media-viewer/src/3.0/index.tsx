import * as React from 'react';
import {Component} from 'react';
import {Context, FileItem, MediaCollection} from '@atlaskit/media-core';
import {ItemInfo, ItemPreview, Navigation, MiniModeView} from './views';
import {MainWrapper} from './styled';
import {MediaIdentifier} from './domain';

// TODO: Move common types/interfaces to "domain" folder
export type CollectionName = string;
export interface NavigationConfig {
  initialItem: MediaIdentifier;
  list?: Array<MediaIdentifier>;
  collectionName?: CollectionName;
}

export interface MediaViewerProps {
  context: Context;
  navigation: NavigationConfig;
  openerElement?: HTMLElement;
  onPreviewChanged?: (item: MediaIdentifier) => void;
  isVisible?: boolean;
  onClose?: any;
}

export interface MediaViewerState {
  currentItem?: MediaIdentifier;
  metadata?: FileItem;
  error?: any;
  listItems?: Array<MediaIdentifier>;
  isMiniModeActive: boolean;
}

export class MediaViewer extends Component<MediaViewerProps, MediaViewerState> {
  subscription: any;

  state: MediaViewerState = {
    isMiniModeActive: false
  };

  fetchMetadata(item: MediaIdentifier) {
    const { context } = this.props;
    const {id, mediaItemType, collectionName} = item;
    const provider = context.getMediaItemProvider(id, mediaItemType, collectionName);

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = provider.observable().subscribe({
      next: (metadata: FileItem) => {
        this.setState({ metadata });
      },
      error: (error) => {
        this.setState({error});
      }
    });
  }

  getListItems(): Promise<Array<MediaIdentifier>> {
    return new Promise((resolve, reject) => {
      const {navigation, context} = this.props;
      const collectionName = navigation.collectionName;
      if (navigation.list) {
        return resolve(navigation.list);
      }

      if (collectionName) {
        const provider = context.getMediaCollectionProvider(collectionName, 20);
        // TODO: clean subscription
        provider.observable().subscribe({
          next(collection: MediaCollection) {
            // TODO: Re-use metada provided from the collection call
            const fileItems = collection.items
              .filter(i => i.type === 'file')
              .map(i => ({
                id: i.details.id,
                collectionName,
                mediaItemType: 'file'
              } as MediaIdentifier));

            resolve(fileItems);
          },
          // error: (error: AxiosError): void => {
          //   this.setState({ collection: undefined, error, loading: false });
          // }
        });
      }
    });
  }

  componentDidMount(): void {
    const {initialItem} = this.props.navigation;
    this.fetchMetadata(initialItem);
    this.getListItems().then((listItems: Array<MediaIdentifier>) => {
      this.setState({listItems});
    });
  }


  render() {
    const {context, navigation, isVisible} = this.props;
    if (!isVisible) { return null; }

    const {metadata, currentItem, listItems, isMiniModeActive, } = this.state;
    const selected = currentItem || navigation.initialItem;
    const list = listItems || [];
    const canUseMiniMode = !!list.length;
    const onMiniModeChange = () => this.onMiniModeChange(false);
    const openerOrigin = this.getOpenerOrigin();

    return (
      <MainWrapper openerOrigin={openerOrigin}>
        {list.length ? <Navigation
          list={list}
          selected={selected}
          onNext={this.navigate('next')}
          onPrev={this.navigate('prev')}
        /> : null}
        <MiniModeView
          isVisible={isMiniModeActive}
          onClose={onMiniModeChange}
          list={list}
          context={context}
          onCardClick={this.onCardClick}
        />
        <ItemInfo
          metadata={metadata}
          isMiniModeActive={isMiniModeActive}
          canUseMiniMode={canUseMiniMode}
          onMiniModeChange={this.onMiniModeChange}
          onClose={this.onMediaViewerClose}
        />
        {metadata ?
          <ItemPreview
            context={context}
            metadata={metadata}
            identifer={selected}
          /> : null}

      </MainWrapper>
    );
  }

  getOpenerOrigin(): string {
    const {openerElement} = this.props;

    if (!openerElement) { return ''; }

    const {left, top, width, height} = openerElement.getBoundingClientRect();
    const leftOrigin = left + width / 2;
    const topOrigin = top + height / 2;

    return `${leftOrigin}px ${topOrigin}px`;
  }

  navigate = (direction) => (currentItem: MediaIdentifier) => {
    this.setState({currentItem});
    this.fetchMetadata(currentItem);
  }

  onMiniModeChange = (isMiniModeActive: boolean) => {
    this.setState({isMiniModeActive});
  }

  onCardClick = (currentItem: MediaIdentifier) => {
    this.setState({
      currentItem,
      isMiniModeActive: false
    });
    this.fetchMetadata(currentItem);
  }

  onMediaViewerClose = () => {
    const {onClose} = this.props;
    if (!onClose) { return; }

    onClose();
  }
}
