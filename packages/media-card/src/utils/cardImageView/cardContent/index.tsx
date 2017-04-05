import * as React from 'react';
import {Component} from 'react';
import {MediaType} from '@atlaskit/media-core';
import FileIcon from '@atlaskit/icon/glyph/file';
import {LoadingWrapper} from './styled';
import {MediaImage} from '../../mediaImage';

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
      return <MediaImage dataURI={this.props.dataURI} fadeIn={this.props.loading} />;
    } else {
      return null;
    }
  }
}
