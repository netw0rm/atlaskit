/**
 * Used for links with appearance 'image'
 *
 * TODO:
 *   - Use FileCardView when link type is 'image'
 */

import * as React from 'react';
import {Component} from 'react';
import {CardAction} from '@atlaskit/media-core';

import {CardDimensions, CardAppearance} from '../../card';
import {CardImageView} from '../../utils/cardImageView';

export interface LinkCardImageViewProps {
  linkUrl: string;
  title: string;
  site?: string;
  description?: string;
  thumbnailUrl?: string;
  iconUrl?: string;
  appearance?: CardAppearance;
  dimensions?: CardDimensions;
  loading?: boolean;
  actions?: Array<CardAction>;
  onClick?: (event: Event) => void;
  error?: string;
}

export class LinkCardImageView extends Component<LinkCardImageViewProps, {}> {
  render() {
    const {title, site, thumbnailUrl, loading, dimensions, actions, onClick, error, iconUrl} = this.props;

    return <CardImageView
      mediaName={title}
      subtitle={site}
      mediaType={'image'}
      dataURI={thumbnailUrl}
      loading={loading}
      dimensions={dimensions}
      actions={actions}
      onClick={onClick}
      error={error}
      icon={iconUrl}
    />;
  }
}
