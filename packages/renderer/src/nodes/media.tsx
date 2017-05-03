import * as React from 'react';
import { PureComponent } from 'react';
import {
  Context,
  ContextConfig,
  ContextFactory,
  MediaItemType,
  MediaProvider,
  CardEventHandler,
} from '@atlaskit/media-core';

import {
  Card,
  CardView,
  CardDimensions,
} from '@atlaskit/media-card';

import {
  Renderable,
} from './';

export interface MediaNode extends Renderable {
  type: string;
  attrs: {
    type: MediaItemType;
    id: string;
    collectionId: string[];
  };
}

export interface MediaProps {
  mediaProvider?: Promise<MediaProvider>;
  onClick?: CardEventHandler;
  cardDimensions?: CardDimensions;
  item: MediaNode;
}

export interface State {
  mediaProvider?: MediaProvider;
  viewContext?: Context;
}

export default class Media extends PureComponent<MediaProps, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (this.props.mediaProvider) {
      this.handleNewMediaProvider(this.props.mediaProvider);
     }
   }

  componentWillReceiveProps(nextProps: MediaProps) {
    const { mediaProvider } = nextProps;

    if (mediaProvider && this.props.mediaProvider !== mediaProvider) {
      this.handleNewMediaProvider(mediaProvider);
    }
  }

  render() {
    switch (this.props.item.attrs.type) {
      case 'file':
        return this.renderFile();

      default:
        return null;
    }
  }

  private renderFile() {
    const { cardDimensions, item } = this.props;
    const { mediaProvider, viewContext } = this.state;
    const { collectionId, id } = item.attrs;

    if ( !mediaProvider || !viewContext ) {
      return <CardView
        status="loading"
        mediaItemType="file"
      />;
    }

    return (
      <Card
        dimensions={cardDimensions}
        context={viewContext}
        identifier={{
          id,
          mediaItemType: 'file',
          collectionName: collectionId[0]
        }}
        selectable={false}
      />
    );
  }

  private async handleNewMediaProvider(mediaProvider: Promise<MediaProvider>) {
    const resolvedMediaProvider = await this.props.mediaProvider;
    if (!resolvedMediaProvider) {
      return;
    }

    this.setState({ mediaProvider: resolvedMediaProvider });

    let context = await resolvedMediaProvider.viewContext;
    if ('clientId' in context) {
      context = ContextFactory.create(context as ContextConfig);
    }

    this.setState({ viewContext: context as Context });
   }
}
