import * as React from 'react';
import {Component} from 'react';
import {Placeholder} from '../generic/placeholder/placeholder';
import {MediaType} from '@atlaskit/media-core';
import FileIcon from '@atlaskit/icon/glyph/file';
import {LoadingWrapper, FadeinImage} from './styled';

export interface CardContentProps {
  mediaType?: MediaType;
  dataURI?: string;
  loading?: boolean;
}

export class CardContent extends Component<CardContentProps, {}> {
  render() {
    if (this.props.loading) {
      return <LoadingWrapper>
               <FileIcon label="loading" size="medium"/>
             </LoadingWrapper>;
    }

    if (this.props.mediaType === 'image' && this.props.dataURI) {
      return <FadeinImage>
               <img alt="" src={this.props.dataURI} />
             </FadeinImage>;
    } else {
      return <Placeholder mediaType={this.props.mediaType} />;
    }
  }
}
