import * as React from 'react';
import * as cx from 'classnames';
import {Component, MouseEvent} from 'react';
import {CardAction, MediaType} from '@atlaskit/media-core';

import {toHumanReadableMediaSize, Menu, ErrorIcon} from '../../utils';
import {CardGenericViewSmall} from '../../utils/cardGenericViewSmall';
import {Error, Title, Size, Retry, SmallCard, ImgWrapper, RoundedBackground, InfoWrapper, FileInfoWrapper} from './styled';

export interface CardViewSmallProps {
  width?: number;
  mediaName?: string;
  mediaType?: MediaType;
  mediaSize?: number;
  dataURI?: string;
  progress?: number;
  loading?: boolean;
  menuActions?: Array<CardAction>;
  onClick?: (event: Event) => void;
  error?: string;
  onRetry?: CardAction;
}

export class CardViewSmall extends Component<CardViewSmallProps, {}> {
  render() {
    const subtitle = this.props.mediaSize && toHumanReadableMediaSize(this.props.mediaSize);

    return <CardGenericViewSmall
      title={this.props.mediaName}
      subtitle={subtitle}
      thumbnailUrl={this.props.dataURI}
      width={this.props.width}
      loading={this.props.loading}
      menuActions={this.props.menuActions}
      onClick={this.props.onClick}
      error={this.props.error}
      onRetry={this.props.onRetry}
      mediaType={this.props.mediaType}
    />;
  }
}
