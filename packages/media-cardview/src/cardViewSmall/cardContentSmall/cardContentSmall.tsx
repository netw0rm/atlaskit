import * as React from 'react';
import {Component} from 'react';

import {PlaceholderSmall} from '../placholderSmall/placeholderSmall';
import {Spinner} from '../../spinner';
import {MediaTypes} from '@atlaskit/media-domain';

export interface CardContentProps {
  mediaType: MediaTypes.MediaType;
  dataURI?: string;
  loading?: boolean;
}

export class CardContentSmall extends Component<CardContentProps, {}> {
  render() {
    if (this.props.loading) {
      return <Spinner width={25} height={25} loading={this.props.loading} />;
    }

    if (this.props.mediaType === 'image' && this.props.dataURI) {
      return <img alt="" src={this.props.dataURI} />;
    } else {
      return <PlaceholderSmall mediaType={this.props.mediaType} />;
    }
  }
}
