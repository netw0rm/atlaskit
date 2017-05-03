import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {MediaType, MediaItemType, CardAction, CardActionType} from '@atlaskit/media-core';

import {getCSSUnitValue} from '../index';
import {CardDimensions, CardProcessingStatus} from '../../index';
import {CardContent} from './cardContent';
import {CardOverlay} from './cardOverlay';
import {Card as Wrapper} from './styled';
import {UploadingView} from '../../utils/uploadingView';

export interface CardImageViewProps {
  mediaItemType?: MediaItemType;
  mediaName?: string;
  mediaType?: MediaType;
  subtitle?: string;

  dataURI?: string;
  progress?: number;
  status?: CardProcessingStatus;

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

  isLoading() {
    const {status} = this.props;
    return status === 'loading' || status === 'processing';
  }

  render() {
    const cardStyle = {height: this.height, width: this.width};
    const {error, mediaItemType, mediaName, mediaType, onRetry, actions, icon, subtitle, dataURI, selectable, selected, progress, status} = this.props;

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

    if (status === 'uploading') {

      // we need to prevent the card's onClick from being invoked
      let onCancel;
      const deleteActions = actions && actions.filter(action => action.type === CardActionType.delete) || [];
      if (deleteActions.length) {
        onCancel = event => {
          event.preventDefault();
          event.stopPropagation();
          deleteActions[0].handler();
        };
      }

      return (
        <Wrapper style={cardStyle} className={'card'} onClick={this.onClick}>
          <div className="wrapper">
            <UploadingView
              title={mediaName}
              progress={progress || 0}
              dataURI={dataURI}
              onCancel={onCancel}
            />
          </div>
        </Wrapper>
      );

    }

    const isPersistent = mediaType === 'doc' || !dataURI;
    const overlay = this.isLoading() ? false : <CardOverlay
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
              loading={this.isLoading()}
              mediaItemType={mediaItemType}
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
    if (this.props.onClick) {
      this.props.onClick(event.nativeEvent);
    }
  }
}

export default CardImageView;
