import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction} from '@atlaskit/media-core';
import {MediaType} from '@atlaskit/media-core';

import {CardDimensions} from '../../card';
import {CardContent} from '../cardContent';
import {CardOverlay} from '../cardOverlay';
import {Card} from './styled';

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

  menuActions?: Array<CardAction>;
  onClick?: (event: Event) => void;

  error?: string;
  onRetry?: CardAction;
}

export const DEFAULT_CARD_DIMENSIONS = {
  WIDTH: '156px',
  HEIGHT: '104px'
};


export class FileCardView extends Component<FileCardViewProps, {}> {
  private get width(): string {
    const {width} = this.props.dimensions || {width: undefined};

    if (!width) {
      return DEFAULT_CARD_DIMENSIONS.WIDTH ;
    }

    return typeof width === 'string' ? width : `${width}px`;
  }

  private get height(): string {
    const {height} = this.props.dimensions || {height: undefined};

    if (!height) {
      return DEFAULT_CARD_DIMENSIONS.HEIGHT ;
    }

    return typeof height === 'string' ? height : `${height}px`;
  }

  render() {
    const cardStyle = {height: this.height, width: this.width};
    const error = this.props.error;

    if (error) {
      return (
        <Card style={cardStyle} className={'card'} onClick={this.onClick.bind(this)}>
          <div className={'wrapper'} />
          <CardOverlay
            persistent={true}
            mediaName={this.props.mediaName}
            mediaType={this.props.mediaType}
            error={error}
            onRetry={this.props.onRetry}
            menuActions={this.props.menuActions}
          />
        </Card>
      );
    } else {
      const isPersistent = !(this.props.mediaType === 'image' && this.props.dataURI);
      const overlay = this.props.loading ? false : <CardOverlay
        persistent={isPersistent}
        selectable={this.props.selectable}
        selected={this.props.selected}

        mediaName={this.props.mediaName}
        mediaType={this.props.mediaType}
        mediaSize={this.props.mediaSize}
        progress={this.props.progress}

        menuActions={this.props.menuActions}
      />;
      return (
        <Card style={cardStyle} className={'card'} onClick={this.onClick.bind(this)}>
          <div className={'wrapper'}>
            <div className={'img-wrapper'}>
              <CardContent
                loading={this.props.loading}
                mediaType={this.props.mediaType}
                dataURI={this.props.dataURI}
              />
            </div>
            {overlay}
          </div>
        </Card>
      );
    }
  }

  onClick(event: MouseEvent<HTMLDivElement>) {
    this.props.onClick && this.props.onClick(event.nativeEvent);
  }
}

export default FileCardView;
