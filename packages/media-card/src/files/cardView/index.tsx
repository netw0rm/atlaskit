import * as React from 'react';
import {Component} from 'react';
import {CardAction} from '@atlaskit/media-core';
import {MediaType} from '@atlaskit/media-core';

import {CardDimensions, CardStatus} from '../../index';
import {CardImageView} from '../../utils/cardImageView';
import {toHumanReadableMediaSize} from '../../utils';

export interface FileCardViewProps {
  mediaName?: string;
  mediaType?: MediaType;
  mediaSize?: number;

  dataURI?: string;
  videoUrl?: Promise<string>;
  progress?: number;
  status: CardStatus;

  dimensions?: CardDimensions;

  selectable?: boolean;
  selected?: boolean;

  actions?: Array<CardAction>;
  onClick?: (event: Event) => void;

  error?: string;
  onRetry?: CardAction;
}

export const DEFAULT_CARD_DIMENSIONS = {
  WIDTH: '156px',
  HEIGHT: '104px'
};

export class FileCardView extends Component<FileCardViewProps, {}> {
  render() {
    const {mediaSize, mediaType, mediaName, dataURI, videoUrl, status,
      progress, dimensions, selectable, selected, actions, onClick, error, onRetry} = this.props;
    const fileSize = toHumanReadableMediaSize(mediaSize || 0);
    const elementToWidget = () => {
      return <FileCardView {...this.props} key={new Date().getTime()} dimensions={{width: '100%', height: 'calc(100% - 90px)'}} />;
    };

    return <CardImageView
      mediaType={mediaType}
      mediaName={mediaName}
      subtitle={fileSize}
      dataURI={dataURI}
      videoUrl={videoUrl}
      progress={progress}
      status={status}
      dimensions={dimensions}
      selectable={selectable}
      selected={selected}
      actions={actions}
      onClick={onClick}
      error={error}
      onRetry={onRetry}
      elementToWidget={elementToWidget}
    />;
  }
}

export default FileCardView;
