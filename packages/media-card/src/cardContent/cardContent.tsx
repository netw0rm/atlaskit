import * as React from 'react';
import {Component} from 'react';
import {MediaType} from '@atlaskit/media-core';
import FileIcon from '@atlaskit/icon/glyph/file';
import {LoadingWrapper} from './styled';
import {FadeinImage} from '../styles/base';

export interface CardContentProps {
  mediaType?: MediaType;
  dataURI?: string;
  loading?: boolean;
  isPreviewable: boolean;
}

export class CardContent extends Component<CardContentProps, {}> {
  render() {
    if (this.props.loading) {
      return <LoadingWrapper>
               <FileIcon label="loading" size="medium"/>
             </LoadingWrapper>;
    }

    if (this.props.isPreviewable) {
      return <FadeinImage>
               <img alt="" src={this.props.dataURI} />
             </FadeinImage>;
    } else {
      return null;
    }
  }
}
