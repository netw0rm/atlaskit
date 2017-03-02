import * as React from 'react';
import {Component} from 'react';
import {LoadingWrapper, CardImage, transparentFallbackBackground} from '../styled';
import {PlaceholderSmall} from '../placholderSmall/placeholderSmall';
import {MediaType} from '@atlaskit/media-core';

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
      const style = {
        backgroundImage: `url(${this.props.dataURI}), ${transparentFallbackBackground}`
      };

      return <CardImage style={style} />;
    } else {
      return <PlaceholderSmall mediaType={this.props.mediaType} />;
    }
  }
}
