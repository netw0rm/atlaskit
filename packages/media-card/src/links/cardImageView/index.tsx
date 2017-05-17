import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction} from '@atlaskit/media-core';

import {CardDimensions, CardAppearance, CardStatus} from '../../index';
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
  status: CardStatus;
  actions?: Array<CardAction>;
  error?: string;

  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
}

export class LinkCardImageView extends Component<LinkCardImageViewProps, {}> {
  render() {
    const {title, site, thumbnailUrl, status, dimensions, actions, onClick, onMouseEnter, error, iconUrl, linkUrl} = this.props;

    return (
      <Href linkUrl={linkUrl}>
        <CardImageView
          mediaItemType="link"
          mediaName={title}
          subtitle={site || linkUrl}
          mediaType="image"
          dataURI={thumbnailUrl}
          status={status}
          dimensions={dimensions}
          actions={actions}
          error={error}
          icon={iconUrl}

          onClick={onClick}
          onMouseEnter={onMouseEnter}
        />
      </Href>
    );
  }
}
