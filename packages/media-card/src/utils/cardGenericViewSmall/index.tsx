import * as React from 'react';
import {Component, MouseEvent} from 'react';
import * as cx from 'classnames';
import {CardAction, MediaType, MediaItemType} from '@atlaskit/media-core';
import {getCSSUnitValue} from '../getCSSUnitValue';
import {Menu, ErrorIcon, defaultSmallCardDimensions} from '../../utils';
import {MediaTypeIcon} from '../../utils/mediaTypeIcon';
import {CardDimensions, CardDimensionValue} from '../..';
import {InfoView} from './infoView';
import {ThumbnailView} from './thumbnailView';
import {ErrorWrapper, Error, Retry, SmallCard, ImgWrapper, InfoWrapper, ActionsWrapper} from './styled';

export interface CardGenericViewSmallProps {
  type: MediaItemType;
  dimensions?: CardDimensions;
  title?: string;
  subtitle?: string;
  mediaType?: MediaType;
  iconUrl?: string;
  thumbnailUrl?: string;
  loading?: boolean;
  actions?: Array<CardAction>;
  error?: string;
  onRetry?: CardAction;
}

export interface CardGenericViewSmallState {
  isMenuExpanded: boolean;
}

export class CardGenericViewSmall extends Component<CardGenericViewSmallProps, CardGenericViewSmallState> {
  state: CardGenericViewSmallState = {
    isMenuExpanded: false
  };

  private get width(): CardDimensionValue {
    const {width} = this.props.dimensions || {width: undefined};

    if (!width) {
      return defaultSmallCardDimensions.width;
    }

    return getCSSUnitValue(width);
  }

  private get height(): CardDimensionValue {
    const {height} = this.props.dimensions || {height: undefined};

    if (!height) {
      return defaultSmallCardDimensions.height;
    }

    return getCSSUnitValue(height);
  }

  private get wrapperStyles(): CardDimensions {
    return {
      width: getCSSUnitValue(this.width),
      height: getCSSUnitValue(this.height)
    };
  }

  render() {
    const {error} = this.props;
    if (error) {
      return this.renderError();
    } else {
      return this.renderCard();
    }
  }

  renderFileCard() {
    const {loading, mediaType, thumbnailUrl, title, subtitle} = this.props;
    return this.formatCard(
      <ThumbnailView
        type="file"
        url={thumbnailUrl}
        isLoading={loading}
      />,
      <InfoView
        icon={<MediaTypeIcon type={mediaType}/>}
        title={title}
        subtitle={subtitle}
        isLink={false}
        isLoading={loading}
      />
    );
  }

  renderLinkCard() {
    const {loading, iconUrl, thumbnailUrl, title, subtitle} = this.props;
    return this.formatCard(
      <ThumbnailView
        type="link"
        url={thumbnailUrl}
        isLoading={loading}
      />,
      <InfoView
        icon={iconUrl ? <img src={iconUrl}/> : null}
        title={title}
        subtitle={subtitle}
        isLink={true}
        isLoading={loading}
      />
    );
  }

  renderCard() {
    const {type} = this.props;
    if (type === 'link') {
      return this.renderLinkCard();
    } else {
      return this.renderFileCard();
    }
  }

  renderError() {
    const {error, onRetry} = this.props;
    const retryMessage = (onRetry) ? (onRetry.label || 'Try again') : '';
    const retryHandler = (event: MouseEvent<HTMLSpanElement>) => {
      // We need to prevent the card's onClick being called
      event.stopPropagation();
      event.preventDefault();

      if (onRetry) {
        onRetry.handler(undefined, event.nativeEvent);
      }
    };

    const retryComponent = (onRetry) ? (
      <Retry className="retry">
        <span onClick={retryHandler}>{retryMessage}</span>
      </Retry>
    ) : null;

    return this.formatCard(
      <ErrorIcon />,
      <ErrorWrapper>
        <Error className="error">{error}</Error>
        {retryComponent}
      </ErrorWrapper>
    );
  }

  private formatCard(left: JSX.Element, right: JSX.Element) {
    const {actions, loading, error} = this.props;
    const cardStyle = this.wrapperStyles;
    const cardClass = cx('media-card', {loading});

    return (
      <SmallCard className={cardClass} style={cardStyle}>
        <ImgWrapper shadow={!loading && !error}>
          {left}
        </ImgWrapper>
        <InfoWrapper>
          {right}
        </InfoWrapper>
        <ActionsWrapper>
          <Menu actions={actions} />
        </ActionsWrapper>
      </SmallCard>
    );
  }
}
