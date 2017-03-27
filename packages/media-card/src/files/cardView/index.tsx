import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction} from '@atlaskit/media-core';
import {MediaType} from '@atlaskit/media-core';

import {CardImageView} from '../../utils/cardImageView';
import {CardDimensions} from '../../card';

export interface FileCardViewProps {
  mediaName?: string;
  mediaType?: MediaType;
  mediaSize?: number;

  dataURI?: string;
  progress?: number;
  loading?: boolean;

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
    return <CardImageView
      mediaName={this.props.mediaName}
      mediaType={this.props.mediaType}
      mediaSize={this.props.mediaSize}
      dataURI={this.props.dataURI}
      progress={this.props.progress}
      loading={this.props.loading}
      dimensions={this.props.dimensions}
      selectable={this.props.selectable}
      selected={this.props.selected}
      actions={this.props.actions}
      onClick={this.props.onClick}
      error={this.props.error}
      onRetry={this.props.onRetry}
    />;
  }
}

export default FileCardView;
