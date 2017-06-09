import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {MediaType, MediaItemType, CardAction, CardActionType} from '@atlaskit/media-core';

import {getCSSUnitValue} from '../getCSSUnitValue';
import {CardDimensions, CardStatus} from '../../index';
import {CardContent} from './cardContent';
import {CardOverlay} from './cardOverlay';
import {Card as Wrapper} from './styled';
import {UploadingView} from '../../utils/uploadingView';

// Audio and video widget imports
import {showAudioWidget, showVideoWidget} from '../../utils/widget';

export interface CardImageViewProps {
  id?: string;
  mediaItemType?: MediaItemType;
  mediaName?: string;
  mediaType?: MediaType;
  subtitle?: string;

  dataURI?: string;
  progress?: number;
  status?: CardStatus;

  dimensions?: CardDimensions;

  selectable?: boolean;
  selected?: boolean;

  error?: string;
  icon?: string;

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

  private isDownloadingOrProcessing() {
    const {status} = this.props;
    return status === 'loading' || status === 'processing';
  }

  private get cardStyle() {
    return {height: this.height, width: this.width};
  }

  render() {
    const {onMouseEnter} = this.props;
    const cardStyle = this.cardStyle;

    return (
      <Wrapper style={cardStyle} onClick={this.getClickHandler()} onMouseEnter={onMouseEnter}>
        {this.getCardContents()}
      </Wrapper>
    );
  }

  private getCardContents = (): Array<JSX.Element> | JSX.Element => {
    const {error, status} = this.props;

    if (error) {
      return this.getErrorContents();
    }

    if (status === 'uploading') {
      return this.getUploadingContents();
    }

    return this.getSuccessCardContents();
  }

  private getErrorContents = (): Array<JSX.Element> => {
    const {error, mediaName, mediaType, onRetry, actions, icon, subtitle} = this.props;

    // key is required by React 15
    return [
      <div key={0} className="wrapper" />,
      <CardOverlay
        key={1}

        persistent={true}
        mediaName={mediaName}
        mediaType={mediaType}
        error={error}
        onRetry={onRetry}
        actions={actions}
        icon={icon}
        subtitle={subtitle}
      />
    ];
  }

  private getUploadingContents = (): JSX.Element => {
    const {actions, mediaName, progress, dataURI, selectable} = this.props;

    const deleteAction = this.getFirstDeleteAction(actions);
    const overlay = selectable ? this.createUploadingCardOverlay() : null;

    return (
      <div className="wrapper">
        <div className="img-wrapper">
          <UploadingView
            title={mediaName}
            progress={progress || 0}
            dataURI={dataURI}
            deleteAction={deleteAction}
          />
        </div>
        {overlay}
      </div>
    );
  }

  private createUploadingCardOverlay = (): JSX.Element => {
    const {mediaType, dataURI, selectable, selected} = this.props;
    const isPersistent = mediaType === 'doc' || !dataURI;

    return (
      <CardOverlay
        persistent={isPersistent}
        selectable={selectable}
        selected={selected}
      />
    );
  }

  private getFirstDeleteAction = (actions: Array<CardAction> | undefined): CardAction | undefined => {
    if (!actions) {
      return;
    }

    const deleteActions = actions.filter(a => a.type === CardActionType.delete);
    return deleteActions[0];
  }

  private getSuccessCardContents = (): JSX.Element => {
    const {mediaType, mediaItemType, dataURI} = this.props;
    const overlay = this.isDownloadingOrProcessing() ? null : this.createSuccessCardOverlay();

    return (
      <div className="wrapper">
        <div className="img-wrapper">
          <CardContent
            loading={this.isDownloadingOrProcessing()}
            mediaItemType={mediaItemType}
            mediaType={mediaType}
            dataURI={dataURI}
          />
        </div>
        {overlay}
      </div>
    );
  }

  private createSuccessCardOverlay = (): JSX.Element => {
    const {mediaName, mediaType, subtitle, dataURI, selectable, selected, actions, icon} = this.props;
    const isPersistent = mediaType === 'doc' || !dataURI;

    return (
      <CardOverlay
        persistent={isPersistent}
        selectable={selectable}
        selected={selected}
        mediaName={mediaName}
        mediaType={mediaType}
        subtitle={subtitle}
        actions={actions}
        icon={icon}
      />
    );
  }

  private getClickHandler = () => {
    const {onClick, audioUrl, videoUrl} = this.props;

    if (onClick) {
      return onClick;
    }

    if (audioUrl) {
      return this.makeAudioWidget;
    }

    if (videoUrl) {
      return this.makeVideoWidget;
    }
  }

  private makeAudioWidget = (evt): void => {
    const {mediaName, audioUrl} = this.props;

    if (!audioUrl) {
      return;
    }

    evt.preventDefault();
    evt.stopPropagation();
    showAudioWidget({title: mediaName, audioUrl});
  }

  private makeVideoWidget = (evt): void => {
    const {mediaName, videoUrl} = this.props;

    if (!videoUrl) {
      return;
    }

    evt.preventDefault();
    evt.stopPropagation();
    showVideoWidget({title: mediaName, videoUrl});
  }
}

export default CardImageView;
