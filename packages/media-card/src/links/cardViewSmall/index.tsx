import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction} from '@atlaskit/media-core';

import {CardGenericViewSmall} from '../../utils/cardGenericViewSmall';
import {Href} from '../../utils/href';

export interface LinkCardViewSmallProps {
  width?: number | string;
  linkUrl: string;
  title: string;
  site?: string;
  thumbnailUrl?: string;
  loading?: boolean;
  error?: string;
  actions?: Array<CardAction>;

  videoUrl?: Promise<string>;
  audioUrl?: Promise<string>;

  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onRetry?: CardAction;
}

export class LinkCardViewSmall extends Component<LinkCardViewSmallProps, {}> {
  render() {
    const {error, loading, linkUrl} = this.props;

    return error || loading
      ? this.getCardGenericViewSmall()
      : <Href linkUrl={linkUrl}>{this.getCardGenericViewSmall()}</Href>;
  }

  private getCardGenericViewSmall(): JSX.Element {
    const {title, linkUrl, site, thumbnailUrl, width, loading, actions, onClick, onMouseEnter, onRetry, error, audioUrl, videoUrl} = this.props;

    return (
      <CardGenericViewSmall
        title={title}
        subtitle={site || linkUrl}
        thumbnailUrl={thumbnailUrl}
        width={width}
        loading={loading}
        actions={actions}
        error={error}
        mediaType="image"

        audioUrl={audioUrl}
        videoUrl={videoUrl}

        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onRetry={onRetry}
      />
    );
  }
}
