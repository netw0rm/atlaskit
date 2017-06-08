import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction} from '@atlaskit/media-core';
import {MediaType} from '@atlaskit/media-core';

import {CardDimensions, CardStatus} from '../../index';
import {CardImageView} from '../../utils/cardImageView';
import {toHumanReadableMediaSize} from '../../utils';

export interface FileCardImageViewProps {
  mediaName?: string;
  mediaType?: MediaType;
  mediaSize?: number;

  dataURI?: string;
  progress?: number;
  status: CardStatus;

  dimensions?: CardDimensions;

  selectable?: boolean;
  selected?: boolean;

  error?: string;

  audioUrl?: Promise<string>;
  videoUrl?: Promise<string>;

  actions?: Array<CardAction>;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onRetry?: CardAction;
}

export const DEFAULT_CARD_DIMENSIONS = {
  WIDTH: '156px',
  HEIGHT: '104px'
};

export class FileCardImageView extends Component<FileCardImageViewProps, {}> {
  render() {
    const {mediaSize, mediaType, mediaName, dataURI, status,
      progress, dimensions, selectable, selected, actions, onClick, error, onRetry, onMouseEnter,
      audioUrl, videoUrl} = this.props;
    const fileSize = toHumanReadableMediaSize(mediaSize || 0);

    return <CardImageView
      error={error}
      mediaType={mediaType}
      mediaName={mediaName}
      subtitle={fileSize}
      dataURI={dataURI}
      progress={progress}
      status={status}
      dimensions={dimensions}
      selectable={selectable}
      selected={selected}
      actions={actions}

      audioUrl={audioUrl}
      videoUrl={videoUrl}

      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onRetry={onRetry}
    />;
  }
}

export default FileCardImageView;
