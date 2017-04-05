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
    const {mediaSize, mediaName, dataURI, width, loading, actions, onClick, error, onRetry, mediaType} = this.props;
    const subtitle = toHumanReadableMediaSize(mediaSize || 0);

    return <CardGenericViewSmall
      title={mediaName}
      subtitle={subtitle}
      thumbnailUrl={dataURI}
      width={width}
      loading={loading}
      actions={actions}
      onClick={onClick}
      error={error}
      onRetry={onRetry}
      mediaType={mediaType}
    />;
  }
}
