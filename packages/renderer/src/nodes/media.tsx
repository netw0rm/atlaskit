import * as React from 'react';
import { PureComponent } from 'react';
import {
  CardEventHandler,
  CardClick,
  Context,
  ContextConfig,
  ContextFactory,
  MediaItemType,
  MediaProvider,
  MediaState,
  UrlPreview,
} from '@atlaskit/media-core';
import {
  Card,
  CardDimensions,
  CardView,
  MediaIdentifier,
  UrlPreviewIdentifier,
} from '@atlaskit/media-card';

import {
  Renderable,
} from './';

export interface MediaNode extends Renderable {
  type: string;
  attrs: {
    type: MediaItemType;
    id: string;
    collection: string;
  };
}

export interface MediaProps {
  mediaProvider?: Promise<MediaProvider>;
  onClick?: CardEventHandler;
  cardDimensions?: CardDimensions;
  item: MediaNode;
}

export interface State extends MediaState {
  mediaProvider?: MediaProvider;
  viewContext?: Context;
}

export interface State {
  viewContext?: Context;
}

const noop = () => {};

export default class Media extends PureComponent<MediaProps, State> {
  state: State = {
    id: '',
    status: 'unknown'
  };

  componentWillMount() {
    this.handleMediaProvider(this.props);
  }

  componentWillUnmount() {
    const { mediaProvider } = this.state;
    if (!mediaProvider) {
      return;
    }

    const { stateManager } = mediaProvider;
    if (stateManager) {
      const { id } = this.props.item.attrs;
      stateManager.unsubscribe(id, this.handleMediaStateChange);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { mediaProvider } = nextProps;

    if (this.props.mediaProvider !== mediaProvider) {
      this.handleMediaProvider(nextProps);
    }
  }

  render() {
    switch (this.props.item.attrs.type) {
      case 'file':
        return this.renderFile();

      case 'link':
        return this.renderLink();

      default:
        return null;
    }
  }

  private async handleMediaProvider(props: MediaProps) {
    const { mediaProvider } = props;
    const { id } = props.item.attrs;

    if (!mediaProvider) {
      this.setState({ mediaProvider });
      return;
    }

    const resolvedMediaProvider = await mediaProvider;
    if (!resolvedMediaProvider) {
      this.setState({ mediaProvider: undefined });
      return;
    }

    this.setState({ mediaProvider: resolvedMediaProvider });

    const { stateManager } = resolvedMediaProvider;
    if (stateManager) {
      stateManager.subscribe(id, this.handleMediaStateChange);
    }

    let context = await resolvedMediaProvider.viewContext;
    if ('clientId' in (context as ContextConfig)) {
      context = ContextFactory.create(context as ContextConfig);
    }

    this.setState({ viewContext: context as Context });
  }

  private handleMediaStateChange = (mediaState: MediaState) => {
    this.setState({ ...mediaState });
  }

  private handleLinkCardViewClick(item: any, event: Event) {
    event.preventDefault();
  }

  private renderLink() {
    const { mediaProvider, viewContext } = this.state;
    const { cardDimensions, item, onClick } = this.props;
    const { collection, id } = item.attrs;

    if (!mediaProvider || !viewContext) {
      const previewDetails = {
        type: '',
        url: '',
        title: ' ... loading'
      } as UrlPreview;

      return <CardView
        // CardViewProps
        status="loading"
        mediaItemType="link"
        metadata={previewDetails}
        dimensions={cardDimensions}

        // SharedCardProps
        actions={[ CardClick(this.handleLinkCardViewClick) ]}
      />;
    }

    const mediaIdentifier = {
      mediaItemType: 'link',
      id: id || '',
      collectionName: collection || ''
    } as MediaIdentifier;

    const urlPreviewIdentifier = {
      mediaItemType: 'link',
      url: id
    } as UrlPreviewIdentifier;

    return (
      <Card
        context={viewContext}
        dimensions={cardDimensions}
        identifier={id ? mediaIdentifier : urlPreviewIdentifier}
        actions={[ CardClick(onClick || noop) ]}
      />
    );
  }

  private renderFile() {
    const { mediaProvider, viewContext } = this.state;
    const { cardDimensions, item } = this.props;
    const { collection, id } = item.attrs;

    if (!mediaProvider || !viewContext) {
      return <CardView
        status="loading"
        mediaItemType="file"
      />;
    }

    return (
      <Card
        context={viewContext!}
        dimensions={cardDimensions}
        identifier={{
          id,
          mediaItemType: 'file',
          collectionName: collection
        }}
        selectable={false}
      />
    );
  }
}
