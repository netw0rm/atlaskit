import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction} from '@atlaskit/media-core';
import {MediaType} from '@atlaskit/media-core';

import {getCSSUnitValue} from '../index';
import {CardDimensions} from '../../card';
import {CardContent} from './cardContent';
import {CardOverlay} from './cardOverlay';
import {Card as Wrapper} from './styled';

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

const DEFAULT_CARD_DIMENSIONS = {
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
    const {error, mediaName, mediaType, onRetry, actions, icon, subtitle, dataURI, loading, selectable, selected, progress} = this.props;

    if (error) {
      return (
        <Wrapper style={cardStyle} className={'card'} onClick={this.onClick}>
          <div className={'wrapper'} />
          <CardOverlay
            persistent={true}
            mediaName={mediaName}
            mediaType={mediaType}
            error={error}
            onRetry={onRetry}
            actions={actions}
            icon={icon}
            subtitle={subtitle}
          />
        </Wrapper>
      );
    }

    const isPersistent = !(mediaType === 'image' && dataURI);
    const overlay = loading ? false : <CardOverlay
      persistent={isPersistent}
      selectable={selectable}
      selected={selected}
      mediaName={mediaName}
      mediaType={mediaType}
      subtitle={subtitle}
      progress={progress}
      actions={actions}
      icon={icon}
    />;

    return (
      <Wrapper style={cardStyle} className={'card'} onClick={this.onClick}>
        <div className={'wrapper'}>
          <div className={'img-wrapper'}>
            <CardContent
              loading={loading}
              mediaType={mediaType}
              dataURI={dataURI}
            />
          </div>
          {overlay}
        </div>
      </Wrapper>
    );
  }

  onClick = (event: MouseEvent<HTMLDivElement>) => {
    this.props.onClick && this.props.onClick(event.nativeEvent);
  }
}

export default CardImageView;
