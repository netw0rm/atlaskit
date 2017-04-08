import * as React from 'react';
import {Component} from 'react';
import * as deepEqual from 'deep-equal';
import {Context,  MediaItemType, MediaItemProvider, UrlPreviewProvider, DataUriService} from '@atlaskit/media-core';

import {SharedCardProps, CardEventProps} from '.';
import {MediaCard} from './mediaCard';

export type Identifier = UrlPreviewIdentifier | MediaIdentifier;
export type Provider = MediaItemProvider | UrlPreviewProvider;

export interface MediaIdentifier {
  readonly mediaItemType: MediaItemType;
  readonly id: string;
  readonly collectionName: string;
}

export interface UrlPreviewIdentifier {
  readonly mediaItemType: 'link';
  readonly url: string;
}

export interface CardProps extends SharedCardProps, CardEventProps {
  readonly context: Context;
  readonly identifier: Identifier;
}

export class Card extends Component<CardProps, {}> {
  static defaultProps = {
    appearance: 'auto'
  };

  private provider: Provider;
  private dataURIService?: DataUriService;

  constructor(props) {
    super(props);
    const {context, identifier} = props;
    this.updateProvider(context, identifier);
    this.updateDataUriService(context, identifier);
  }

  componentWillReceiveProps(nextProps) {
    const {context: currentContext, identifier: currentIdentifier} = this.props;
    const {context: nextContext, identifier: nextIdenfifier} = nextProps;

    if (currentContext !== nextContext || !deepEqual(currentIdentifier, nextIdenfifier)) {
      this.updateProvider(nextContext, nextIdenfifier);
      this.updateDataUriService(nextContext, nextIdenfifier);
    }

  }

  private isUrlPreviewIdentifier(identifier: Identifier): identifier is UrlPreviewIdentifier {
    const preview = identifier as UrlPreviewIdentifier;
    return preview && preview.url !== undefined;
  }

  private updateProvider(context: Context, identifier: Identifier): void {
    if (this.isUrlPreviewIdentifier(identifier)) {
      this.provider = context.getUrlPreviewProvider(identifier.url);
    } else {
      const {id, mediaItemType, collectionName} = identifier;
      this.provider = context.getMediaItemProvider(id, mediaItemType, collectionName);
    }
  };

  private updateDataUriService(context: Context, identifier: Identifier): void {
    if (!this.isUrlPreviewIdentifier(identifier)) {
      this.dataURIService = context.getDataUriService(identifier.collectionName);
    } else {
      this.dataURIService = undefined;
    }
  }

  render() {
    const {context, identifier: {mediaItemType}, ...otherProps} = this.props;
    return <MediaCard
      {...otherProps}
      type={mediaItemType}
      provider={this.provider}
      dataURIService={this.dataURIService}
    />;
  }

}

