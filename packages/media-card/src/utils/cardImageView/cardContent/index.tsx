import * as React from 'react';
import {Component} from 'react';
import {MediaType, MediaItemType} from '@atlaskit/media-core';
import {MediaImage} from '../../mediaImage';
import {CardLoading} from '../../cardLoading';

export interface CardContentProps {
  mediaItemType?: MediaItemType;
  mediaType?: MediaType;
  dataURI?: string;
  loading?: boolean;
}

export class CardContent extends Component<CardContentProps, {}> {
  render() {
    const {loading, mediaType, mediaItemType, dataURI} = this.props;

    if (loading) {
      return <CardLoading mediaItemType={mediaItemType} />;
    }

    if (mediaType === 'image' && dataURI) {
      return <MediaImage dataURI={dataURI} fadeIn={loading} />;
    } else {
      return null;
    }
  }
}
