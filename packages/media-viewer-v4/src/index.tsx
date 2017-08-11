import * as React from 'react';
import {Context, FileItem, FileDetails, MediaCollection} from '@atlaskit/media-core';
import getFileBinaryUrl from './utils/getFileBinaryURL';
import {Frame} from './components/Frame';
import {ImageViewer} from './components/ImageViewer';

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

function isACollection(source: Source): source is string {
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
        const items = collection.items
          .filter(item => item.type === 'file')
          .map(item => item.details)
        ;
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

    if (isACollection(source)) {
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
      return null;
    }

    // const {context, metadata, identifer} = this.props;
    // const mediaType = metadata.details.mediaType;
    // let viewer;

    if (details.mediaType === 'image') {
      // const {context} = this.props;
      // const imageURL = await getFileBinaryUrl(details, context);
      const imageURL = 'https://images3.alphacoders.com/823/thumb-1920-82317.jpg';
      console.log(imageURL);
      return (
        <ImageViewer
          imageURL={imageURL}
        />
      );
    }
    // } else if (mediaType === 'video') {
    //   viewer = <VideoViewer context={context} metadata={metadata} identifier={identifer} />;
    // } else if (mediaType === 'audio') {
    //   viewer = <AudioViewer context={context} metadata={metadata} identifier={identifer} />;
    // } else if (mediaType === 'doc') {
    //   viewer = <PdfViewer context={context} metadata={metadata} identifier={identifer} />;
    // }

    return null;
  }

  render() {
    const {visible} = this.props;
    const {canGoPrev, canGoNext} = this;

    if (!visible) {
      return null;
    }

    return (
      <Frame
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        onGoPrev={this.handleGoPrev}
        onGoNext={this.handleGoNext}
      >
        {this.renderViewer()}
      </Frame>
    );
  }

}
