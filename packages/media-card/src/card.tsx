import * as React from 'react';
import {Component} from 'react';
import {Context, CardAction, MediaItemType, MediaItem, UrlPreview, MediaItemProvider, UrlPreviewProvider} from '@atlaskit/media-core';

import {CardProps} from '.';
import {LinkCard} from './links';
import {FileCard} from './files';
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

export interface SuperCardProps extends CardProps {
  readonly context: Context;
  readonly identifier: Identifier;
}

export class Card extends Component<SuperCardProps, {}> {

  static defaultProps = {
    appearance: 'auto'
  };

  private provider: Provider;

  constructor(props, context) {
    super(props, context);
    this.provider = this.createProviderFromIdentifier(this.props.identifier);
  }

  componentWillReceiveProps(nextProps) {
    const {context: currentContext, identifier: currentIdentifier} = this.props;
    const {context: nextContext, identifier: nextIdenfifier} = nextProps;

    if (currentContext !== nextContext && currentIdentifier !== nextIdenfifier) {
      this.provider = this.createProviderFromIdentifier(this.props.identifier);
    }

  }

  private isUrlPreviewIdentifier(identifier: Identifier): identifier is UrlPreviewIdentifier {
    return (identifier as UrlPreviewIdentifier).url !== undefined;
  }

  private createProviderFromIdentifier(identifier: Identifier): Provider {
    if (this.isUrlPreviewIdentifier(identifier)) {
      return this.props.context.getUrlPreviewProvider(identifier.url);
    }

    const {id, mediaItemType, collectionName} = identifier as MediaIdentifier;
    return this.props.context.getMediaItemProvider(id, mediaItemType, collectionName);
  };

  render() {
    const {identifier: {mediaItemType}} = this.props;
    return <MediaCard type={mediaItemType} provider={this.provider}/>;
  }

}

