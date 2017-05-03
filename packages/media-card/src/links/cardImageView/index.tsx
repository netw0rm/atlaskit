import * as React from 'react'; import {Component} from 'react';
import {CardAction} from '@atlaskit/media-core';

import {CardDimensions, CardAppearance} from '../../index';
import {CardImageView} from '../../utils/cardImageView';
import {Href} from '../../utils/href';

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
    const {title, site, thumbnailUrl, loading, dimensions, actions, onClick, error, iconUrl, linkUrl} = this.props;

    return (
      <Href linkUrl={linkUrl}>
        <CardImageView
          mediaItemType="link"
          mediaName={title}
          subtitle={site || linkUrl}
          mediaType={'image'}
          dataURI={thumbnailUrl}
          loading={loading}
          dimensions={dimensions}
          actions={actions}
          onClick={onClick}
          error={error}
          icon={iconUrl}
        />
      </Href>
    );
  }
}
