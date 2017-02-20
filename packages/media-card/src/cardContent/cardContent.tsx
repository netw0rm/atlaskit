import * as React from 'react';
import {Component} from 'react';
import {Placeholder} from '../generic/placeholder/placeholder';
import {Spinner} from '../generic/spinner/spinner';
import {MediaType} from '@atlaskit/media-core';

export interface CardContentProps {
  mediaType?: MediaType;
  dataURI?: string;
  loading?: boolean;
}

export class CardContent extends Component<CardContentProps, {}> {
  render() {
    if (this.props.loading) {
      return <Spinner
          loading={this.props.loading}
      />;
    }

    if (this.props.mediaType === 'image' && this.props.dataURI) {
      return <img alt="" src={this.props.dataURI} />;
    } else {
      return <Placeholder mediaType={this.props.mediaType} />;
    }
  }
}
