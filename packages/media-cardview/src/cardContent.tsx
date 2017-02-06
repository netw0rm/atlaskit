import * as React from 'react';
import Component = React.Component;

import {Placeholder} from './placeholder'; // MEDIA-FIX
import {Spinner} from './spinner'; // MEDIA-FIX
import {MediaTypes} from '@atlaskit/media-domain';

export interface CardContentProps {
  mediaType: MediaTypes.MediaType;
  dataURI: string;
  loading: boolean;
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
