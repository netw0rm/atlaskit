import * as React from 'react';
import {Component} from 'react';
import {MediaType} from '@atlaskit/media-core';
import {MediaImage} from '../../mediaImage';
import {CardLoading} from '../../cardLoading';

export interface CardContentProps {
  mediaType?: MediaType;
  dataURI?: string;
  loading?: boolean;
}

export class CardContent extends Component<CardContentProps, {}> {
  render() {
    if (this.props.loading) {
      return <CardLoading mediaItemType="file" />;
    }

    if (this.props.mediaType === 'image' && this.props.dataURI) {
      return <MediaImage dataURI={this.props.dataURI} fadeIn={this.props.loading} />;
    } else {
      return null;
    }
  }
}
