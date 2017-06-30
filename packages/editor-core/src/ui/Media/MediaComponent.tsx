import * as React from 'react';
import {
  Card,
  CardStatus,
  CardView,
  CardDimensions,
  UrlPreviewIdentifier,
} from '@atlaskit/media-card';

import {
  ContextConfig,
  ContextFactory,
  Context,
  CardDelete,
  CardClick,
  CardEventHandler,
  FileDetails,
  MediaProvider,
  MediaState,
} from '@atlaskit/media-core';

import { MediaAttributes } from '../../schema';
import { EditorView } from '../../index';

export interface Props extends MediaAttributes {
  mediaProvider?: Promise<MediaProvider>;
  editorView?: EditorView;
  cardDimensions?: CardDimensions;
  onClick?: CardEventHandler;
  onDelete?: CardEventHandler;
}

export interface State extends MediaState {
  mediaProvider?: MediaProvider;
  viewContext?: Context;
  linkCreateContext?: Context;
}

/**
 * Map media state status into CardView processing status
 * Media state status is more broad than CardView API so we need to reduce it
 */
function mapMediaStatusIntoCardStatus(state: MediaState): CardStatus {
  switch (state.status) {
    case 'ready':
    case 'unknown':
    case 'unfinalized':
      return 'complete';

    case 'processing':
      return 'processing';

    case 'uploading':
      return 'uploading';

    // default case is to let TypeScript know that this function always returns a string
    case 'error':
    default:
      return 'error';
  }
}


export default class MediaComponent extends React.PureComponent<Props, State> {
  private thumbnailWm = new WeakMap();
  private destroyed = false;

  state: State = {
    id: '',
    status: 'unknown'
  };

  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    const { mediaProvider } = this.props;

    if (mediaProvider) {
      mediaProvider.then(this.handleMediaProvider);
    }
  }

  public componentWillReceiveProps(nextProps) {
    const { mediaProvider } = nextProps;

    if (this.props.mediaProvider !== mediaProvider) {
      mediaProvider.then(this.handleMediaProvider);
    }
  }

  public componentWillUnmount() {
    this.destroyed = true;

    const { id } = this.props;
    const { mediaProvider } = this.state;

    if (mediaProvider) {
      const { stateManager } = mediaProvider;
      if (stateManager) {
        stateManager.unsubscribe(id, this.handleMediaStateChange);
      }
    }
  }

  render() {
    switch (this.props.type) {
      case 'file':
        return this.renderFile();

      case 'link':
        return this.renderLink();

      default:
        return null;
    }
  }

  private renderLink() {
    const { mediaProvider, linkCreateContext } = this.state;
    const { id, collection, cardDimensions, onDelete } = this.props;
    const url = id;
    if (!mediaProvider || !linkCreateContext) {
      return null;
    }

    linkCreateContext.getUrlPreviewProvider(url).observable().subscribe(
      metadata => linkCreateContext.addLinkItem(url, collection, metadata)
    );

    const identifier: UrlPreviewIdentifier = {
      mediaItemType: 'link',
      url
    };

    return (
      <Card
        context={linkCreateContext}
        dimensions={cardDimensions}
        identifier={identifier}
        appearance="image"
        actions={[CardDelete(onDelete!)]}
      />
    );
  }

  private renderFile() {
    const { mediaProvider, viewContext } = this.state;
    const { id, cardDimensions } = this.props;

    if (!mediaProvider || !viewContext) {
      return <CardView
        status="loading"
        mediaItemType="file"
        dimensions={cardDimensions}
      />;
    }

    if (id.substr(0, 10) === 'temporary:') {
      return this.renderTemporaryFile();
    } else {
      return this.renderPublicFile();
    }
  }

  private renderPublicFile() {
    const { viewContext } = this.state;
    const { cardDimensions, collection, id, onDelete, onClick } = this.props;

    return (
      <Card
        context={viewContext!}
        dimensions={cardDimensions}
        identifier={{
          id,
          mediaItemType: 'file',
          collectionName: collection
        }}
        actions={[CardDelete(onDelete!), CardClick(onClick!)]}
        selectable={false}
      />
    );
  }

  private renderTemporaryFile() {
    const { state } = this;
    const { thumbnail, fileName, fileSize, fileType } = state;
    const { onDelete } = this.props;

    // Cache the data url for thumbnail, so it's not regenerated on each re-render (prevents flicker)
    let dataURI: string | undefined;
    if (thumbnail) {
      if (this.thumbnailWm.has(thumbnail)) {
        dataURI = this.thumbnailWm.get(thumbnail);
      } else {
        dataURI = URL.createObjectURL(thumbnail);
        this.thumbnailWm.set(thumbnail, dataURI);
      }
    }

    // Make sure that we always display progress bar when the file is uploading (prevents flicker)
    let progress = state.progress;
    if (!progress && state.status === 'uploading') {
      progress = .0;
    }

    // Construct file details object
    const fileDetails = {
      name: fileName,
      size: fileSize,
      mimeType: fileType,
      mediaType: (thumbnail || (fileType && fileType.indexOf('image/') > -1) ? 'image' : 'unknown')
    } as FileDetails;

    return <CardView
      // CardViewProps
      status={mapMediaStatusIntoCardStatus(state)}
      mediaItemType="file"
      metadata={fileDetails}

      // FileCardProps
      dataURI={dataURI}
      progress={progress}

      // SharedCardProps
      actions={[CardDelete(onDelete!)]}
    />;
  }

  private handleMediaStateChange = (mediaState: MediaState) => {
    if (this.destroyed) {
      return;
    }

    const newState = {
      ...mediaState
    };

    this.setState(newState);
  }

  private handleMediaProvider = async (mediaProvider: MediaProvider) => {
    const { id } = this.props;

    if (this.destroyed) {
      return;
    }

    this.setState({ mediaProvider: mediaProvider });

    const { stateManager } = mediaProvider;
    if (stateManager) {
      const mediaState = stateManager.getState(id);

      stateManager.subscribe(id, this.handleMediaStateChange);
      this.setState({ mediaProvider, ...mediaState });
    }

    await this.setContext('viewContext', mediaProvider);
    await this.setContext('linkCreateContext', mediaProvider);
  }

  private setContext = async (contextName: string, mediaProvider: MediaProvider) =>  {
    let context = await mediaProvider[contextName];
    if ('clientId' in (context as ContextConfig)) {
      context = ContextFactory.create(context as ContextConfig);
    }

    if (this.destroyed) {
      return;
    }

    this.setState({ [contextName as any]: context as Context });
  }
}
