import * as React from 'react';
import {Component} from 'react';

import {Placeholder} from './placeholder';
// import {Spinner} from './spinner';
import {MediaTypes} from '@atlaskit/media-domain';

export interface CardContentProps {
  mediaType: MediaTypes.MediaType;
  dataURI?: string;
  loading?: boolean;
}

export class CardContent extends Component<CardContentProps, {}> {
  render() {
    if (this.props.loading) {
      return <div>Loading...</div>
      // return <Spinner
      //     loading={this.props.loading}
      // />;
    }

    if (this.props.mediaType === 'image' && this.props.dataURI) {
      return <img alt="" src={this.props.dataURI} />;
    } else {
      return <Placeholder mediaType={this.props.mediaType} />;
    }
  }
}
