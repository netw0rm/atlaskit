import * as React from 'react';
import {Component} from 'react';
import {LoadingWrapper} from '../styled';
import {PlaceholderSmall} from '../placholderSmall/placeholderSmall';
import {MediaType} from '@atlaskit/media-core';
import {MediaImage} from '../../../utils';

export interface CardContentProps {
  mediaType: MediaType;
  dataURI?: string;
  loading?: boolean;
}

export class CardContentSmall extends Component<CardContentProps, {}> {
  render() {
    if (this.props.loading) {
      return <LoadingWrapper />;
    }

    if (this.props.mediaType === 'image' && this.props.dataURI) {
      return <MediaImage dataURI={this.props.dataURI} />;
    } else {
      return <PlaceholderSmall mediaType={this.props.mediaType} />;
    }
  }
}
