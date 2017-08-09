import * as React from 'react';
import {Component} from 'react';
import {CardAction} from '@atlaskit/media-core';

import {CardGenericViewSmall} from '../../utils/cardGenericViewSmall';
import {CardDimensions} from '../..';

export interface LinkCardViewSmallProps {
  dimensions?: CardDimensions;
  linkUrl: string;
  title: string;
  site?: string;
  thumbnailUrl?: string;
  loading?: boolean;
  error?: string;
  actions?: Array<CardAction>;
  onRetry?: CardAction;
}

export class LinkCardViewSmall extends Component<LinkCardViewSmallProps, {}> {
  render() {
    const {title, linkUrl, site, thumbnailUrl, dimensions, loading, actions, onRetry, error} = this.props;

    return (
      <CardGenericViewSmall
        title={title}
        subtitle={site || linkUrl}
        thumbnailUrl={thumbnailUrl}
        dimensions={dimensions}
        loading={loading}
        actions={actions}
        error={error}
        mediaType="image"
        onRetry={onRetry}
      />
    );
  }
}
