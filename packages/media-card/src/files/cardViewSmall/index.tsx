import * as React from 'react';
import {Component} from 'react';
import {CardAction, MediaType} from '@atlaskit/media-core';
import {CardGenericViewSmall} from '../../utils/cardGenericViewSmall';
import {toHumanReadableMediaSize} from '../../utils';
import {CardDimensions} from '../..';

export interface FileCardViewSmallProps {
  dimensions?: CardDimensions;
  mediaName?: string;
  mediaType?: MediaType;
  mediaSize?: number;
  dataURI?: string;
  loading?: boolean;
  error?: string;

  actions?: Array<CardAction>;
  onRetry?: CardAction;
}

export interface FileCardViewSmallState {
  isMenuExpanded: boolean;
}

export class FileCardViewSmall extends Component<FileCardViewSmallProps, FileCardViewSmallState> {
  render() {
    const {error, mediaSize, mediaType, mediaName, dataURI, dimensions, loading, actions, onRetry} = this.props;
    const subtitle = toHumanReadableMediaSize(mediaSize || 0);

    return <CardGenericViewSmall
      error={error}
      mediaType={mediaType}
      title={mediaName}
      subtitle={subtitle}
      thumbnailUrl={dataURI}
      dimensions={dimensions}
      loading={loading}
      actions={actions}
      onRetry={onRetry}
    />;
  }
}
