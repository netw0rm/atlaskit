import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction, MediaType} from '@atlaskit/media-core';
import {CardGenericViewSmall} from '../../utils/cardGenericViewSmall';
import {toHumanReadableMediaSize} from '../../utils';

export interface FileCardViewSmallProps {
  width?: number | string;
  mediaName?: string;
  mediaType?: MediaType;
  mediaSize?: number;
  dataURI?: string;
  loading?: boolean;
  error?: string;

  actions?: Array<CardAction>;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onRetry?: CardAction;
}

export interface FileCardViewSmallState {
  isMenuExpanded: boolean;
}

export class FileCardViewSmall extends Component<FileCardViewSmallProps, FileCardViewSmallState> {
  render() {
    const {error, mediaSize, mediaType, mediaName, dataURI, width, loading, actions, onClick, onMouseEnter, onRetry} = this.props;
    const subtitle = toHumanReadableMediaSize(mediaSize || 0);

    return <CardGenericViewSmall
      error={error}
      mediaType={mediaType}
      title={mediaName}
      subtitle={subtitle}
      thumbnailUrl={dataURI}
      width={width}
      loading={loading}

      actions={actions}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onRetry={onRetry}
    />;
  }
}
