import * as React from 'react';
import {Component} from 'react';
import {CardAction} from '@atlaskit/media-core';

import {CardGenericViewSmall} from '../../utils/cardGenericViewSmall';
import {A} from './styled';

export interface LinkCardViewSmallProps {
  width?: number | string;
  linkUrl: string;
  title: string;
  site?: string;
  thumbnailUrl?: string;
  loading?: boolean;
  onClick?: (event: Event) => void;
  error?: string;
  actions?: Array<CardAction>;
  onRetry?: CardAction;
}

export class LinkCardViewSmall extends Component<LinkCardViewSmallProps, {}> {
  render() {
    const {title, linkUrl, site, thumbnailUrl, width, loading, actions, onClick, onRetry, error} = this.props;

    return (
      <A href={linkUrl} target="_blank" rel="noopener">
        <CardGenericViewSmall
          title={title}
          subtitle={site || linkUrl}
          thumbnailUrl={thumbnailUrl}
          width={width}
          loading={loading}
          actions={actions}
          onClick={onClick}
          error={error}
          onRetry={onRetry}
          mediaType={'image'}
        />
      </A>
    );
  }
}
