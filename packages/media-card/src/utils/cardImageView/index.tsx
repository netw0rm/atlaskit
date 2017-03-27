import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction} from '@atlaskit/media-core';
import {MediaType} from '@atlaskit/media-core';

import {getCSSUnitValue} from '../index';
import {CardDimensions} from '../../card';
import {CardContent} from './cardContent';
import {CardOverlay} from './cardOverlay';
import {Card} from './styled';

export interface CardImageViewProps {
  mediaName?: string;
  mediaType?: MediaType;
  subtitle?: string;

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
  icon?: string;
}

export const DEFAULT_CARD_DIMENSIONS = {
  WIDTH: '156px',
  HEIGHT: '104px'
};

export class CardImageView extends Component<CardImageViewProps, {}> {
  private get width(): string {
    const {width} = this.props.dimensions || {width: undefined};

    if (!width) {
      return DEFAULT_CARD_DIMENSIONS.WIDTH;
    }

    return getCSSUnitValue(width);
  }

  private get height(): string {
    const {height} = this.props.dimensions || {height: undefined};

    if (!height) {
      return DEFAULT_CARD_DIMENSIONS.HEIGHT ;
    }

    return getCSSUnitValue(height);
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
            actions={this.props.actions}
            icon={this.props.icon}
            subtitle={this.props.subtitle}
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
        subtitle={this.props.subtitle}
        progress={this.props.progress}

        actions={this.props.actions}
        icon={this.props.icon}
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

export default CardImageView;
