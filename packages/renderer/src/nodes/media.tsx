import * as React from 'react';
import { PureComponent } from 'react';
import { Context, ContextConfig, ContextFactory, MediaItemType, MediaType, CardEventHandler, CardClick } from '@atlaskit/media-core';
import { FileCard, FileCardView, CardDimensions } from '@atlaskit/media-card';
import { MediaProvider } from '../config';

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
  viewContext?: Context;
}

const noop = () => {};

export default class Media extends PureComponent<MediaProps, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  private handleMediaProvider = (props: MediaProps) => {
    const {mediaProvider} = props;
    if (mediaProvider) {
      mediaProvider
        .then(provider => provider.viewContext)
        .then((mediaContext: ContextConfig) => {
          this.setState({
            viewContext: ContextFactory.create(mediaContext)
          });
        });
    }
  }

  private getActions(props: MediaProps) {
    return [CardClick(props.onClick || noop)];
  }

  private getCardComponent() {
    if (this.state.viewContext) {
      const { collectionId, id } = this.props.item.attrs;
      return <FileCard
        dimensions={this.props.cardDimensions}
        context={this.state.viewContext}
        id={id}
        collectionName={collectionId[0]}
        actions={this.getActions(this.props)}
      />;
    }
    return <FileCardView
      dimensions={this.props.cardDimensions}
      mediaType={'unknown' as MediaType}
      mediaName="Loading…"
    />;
  }

  componentWillMount() {
    this.handleMediaProvider(this.props);
  }

  render() {
    return this.getCardComponent();
  }
}
