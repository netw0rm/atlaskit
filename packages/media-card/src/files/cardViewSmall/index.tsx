import * as React from 'react';
import {Component} from 'react';
import {CardAction, MediaType} from '@atlaskit/media-core';
import {CardGenericViewSmall} from '../../utils/cardGenericViewSmall';

import {toHumanReadableMediaSize} from '../../utils';

export interface FileCardViewSmallProps {
  width?: number | string;
  mediaName?: string;
  mediaType?: MediaType;
  mediaSize?: number;
  dataURI?: string;
  progress?: number;
  loading?: boolean;
  actions?: Array<CardAction>;
  onClick?: (event: Event) => void;
  error?: string;
  onRetry?: CardAction;
}

export interface FileCardViewSmallState {
  isMenuExpanded: boolean;
}

export class FileCardViewSmall extends Component<FileCardViewSmallProps, FileCardViewSmallState> {
  render() {
    const subtitle = this.props.mediaSize && toHumanReadableMediaSize(this.props.mediaSize);

    return <CardGenericViewSmall
      title={this.props.mediaName}
      subtitle={subtitle}
      thumbnailUrl={this.props.dataURI}
      width={this.props.width}
      loading={this.props.loading}
      actions={this.props.actions}
      onClick={this.props.onClick}
      error={this.props.error}
      onRetry={this.props.onRetry}
      mediaType={this.props.mediaType}
    />;
  }
}
