import * as React from 'react';
import {Context, FileItem, FileDetails, MediaCollection} from '@atlaskit/media-core';
import {Main} from './components/main';
import {ImageFetcher} from './components/viewers/image';
import {PDFFetcher} from './components/viewers/pdf';

// TODO: refactor, this exists in `media-card` too
export interface MediaIdentifier {
  readonly mediaItemType: 'file'; // TODO: support links too! e.g. YouTube. MediaItemType
  readonly id: string;
  readonly collectionName: string;
}

export type Source = MediaIdentifier | MediaIdentifier[] | string;
export type Item = FileDetails;

function isAMediaIdentifier(source: Source): source is MediaIdentifier {
  return Boolean(source) && (source as MediaIdentifier).id !== undefined;
}

function isAnArrayOfMediaIdentifiers(source: Source): source is MediaIdentifier[] {
  return Boolean(source) && (source as MediaIdentifier[]).forEach !== undefined;
}

function isACollectionName(source: Source): source is string {
  return Boolean(source) && typeof source === 'string';
}

interface MediaViewerProps {
  visible?: boolean;
  source: Source;
  context: Context;
}

interface MediaViewerState {
  index: number;
  items: Item[];
  error?: Error;
}

export class MediaViewer extends React.Component<MediaViewerProps, MediaViewerState> {

  subscription: any;

  state: MediaViewerState = {
    index: 0,
    items: []
  };

  get canGoPrev(): boolean {
    const {index} = this.state;
    return index > 0;
  }

  get canGoNext(): boolean {
    const {index, items} = this.state;
    return index + 1 < items.length;
  }

  get currentItemCollectionName(): string | undefined {
    const {source} = this.props;
    const {index} = this.state;

    if (isAMediaIdentifier(source)) {
      return source.collectionName;
    }

    if (isAnArrayOfMediaIdentifiers(source)) {
      return source[index].collectionName;
    }

    if (isACollectionName(source)) {
      return source;
    }

    return undefined;
  }

  handleGoPrev = () => {
    if (this.canGoPrev) {
      this.setState(({index}) => ({index: index - 1}));
    }
  }

  handleGoNext = () => {
    if (this.canGoNext) {
      this.setState(({index}) => ({index: index + 1}));
    }
  }

  // TODO: this same code exists in `media-card/MediaCard`... refactor!
  fetchItem(context: Context, identifer: MediaIdentifier) {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // TODO: support links too
    const {id, mediaItemType, collectionName} = identifer;
    const provider = context.getMediaItemProvider(id, mediaItemType, collectionName);
    this.subscription = provider.observable().subscribe({
      next: (fileItem: FileItem) => this.setState({items: [fileItem.details]}),
      error: (error: Error) => this.setState({error})
    });

  }

  fetchItems(context: Context, identifers: MediaIdentifier[]) {
    throw new Error('TODO');
  }

  // TODO: this same code exists in `media-card/CardList`... refactor!
  fetchCollection(context: Context, collectionName: string) {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // TODO: support links too
    const provider = context.getMediaCollectionProvider(collectionName, 20);
    provider.observable().subscribe({
      next: (collection: MediaCollection) => {
        console.log('total items:', collection.items.length);
        const items = collection.items
          .filter(item => item.type === 'file')
          .map(item => item.details)
        ;
        console.log('file items:', items.length);
        this.setState({items});
      },
      error: (error: Error) => this.setState({error})
    });

  }

  fetch() {
    const {context, source} = this.props;

    if (isAMediaIdentifier(source)) {
      this.fetchItem(context, source);
      return;
    }

    if (isAnArrayOfMediaIdentifiers(source)) {
      this.fetchItems(context, source);
      return;
    }

    if (isACollectionName(source)) {
      this.fetchCollection(context, source);
      return;
    }

  }

  componentDidMount(): void {
    this.fetch();
  }

  renderViewer() {
    const {index, items} = this.state;
    const details = items[index];

    if (!details) {
      return null; // TODO: figure out what to show whilst loading
    }

    // const {context, metadata, identifer} = this.props;
    // const mediaType = metadata.details.mediaType;
    // let viewer;

    if (details.mediaType === 'image') {
      const {context} = this.props;
      return (
        <ImageFetcher context={context} details={details} collectionName={this.currentItemCollectionName}/>
      );
    } else if (details.mediaType === 'doc') {
      const {context} = this.props;
      return (
        <PDFFetcher context={context} details={details} collectionName={this.currentItemCollectionName}/>
      );
    }

    // } else if (mediaType === 'video') {
    //   viewer = <VideoViewer context={context} metadata={metadata} identifier={identifer} />;
    // } else if (mediaType === 'audio') {
    //   viewer = <AudioViewer context={context} metadata={metadata} identifier={identifer} />;
    // } else if (mediaType === 'doc') {
    //   viewer = <PdfViewer context={context} metadata={metadata} identifier={identifer} />;
    // }

    return <div>Not implemented</div>;
  }

  render() {
    const {visible} = this.props;
    const {canGoPrev, canGoNext} = this;

    if (!visible) {
      return null;
    }

    return (
      <Main
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        onGoPrev={this.handleGoPrev}
        onGoNext={this.handleGoNext}
      >
        {this.renderViewer()}
      </Main>
    );
  }

}
