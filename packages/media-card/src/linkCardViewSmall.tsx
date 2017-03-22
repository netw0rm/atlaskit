import * as React from 'react';
import {Component} from 'react';
import {CardAction} from '@atlaskit/media-core';

import {CardGenericViewSmall} from './utils/cardGenericViewSmall';

export interface LinkCardViewSmallProps {
  width?: number;
  linkUrl: string;
  title: string;
  thumbnailUrl?: string;
  loading?: boolean;
  onClick?: (event: Event) => void;
  error?: string;
  menuActions?: Array<CardAction>;
  onRetry?: CardAction;
}

export class LinkCardViewSmall extends Component<LinkCardViewSmallProps, {}> {
  render() {
    return <CardGenericViewSmall
      title={this.props.title}
      subtitle={this.props.linkUrl}
      thumbnailUrl={this.props.thumbnailUrl}
      width={this.props.width}
      loading={this.props.loading}
      menuActions={this.props.menuActions}
      onClick={this.props.onClick}
      error={this.props.error}
      onRetry={this.props.onRetry}
      mediaType={'unknown'}
    />;
  }
}
