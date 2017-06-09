import * as React from 'react';
import {Component, MouseEvent} from 'react';
import * as cx from 'classnames';
import {CardAction, MediaType} from '@atlaskit/media-core';
import {CardContentSmall} from './cardContentSmall/cardContentSmall';
import {Menu, ErrorIcon} from '../../utils';
import {getCSSUnitValue} from '../getCSSUnitValue';
import {Error, Title, Size, Retry, SmallCard, ImgWrapper, RoundedBackground, InfoWrapper, FileInfoWrapper} from './styled';

export interface CardGenericViewSmallProps {
  width?: number | string;
  title?: string;
  subtitle?: string;
  mediaType?: MediaType;
  thumbnailUrl?: string;
  loading?: boolean;
  actions?: Array<CardAction>;
  error?: string;

  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onRetry?: CardAction;
}

export interface CardGenericViewSmallState {
  isMenuExpanded: boolean;
}

export class CardGenericViewSmall extends Component<CardGenericViewSmallProps, CardGenericViewSmallState> {
  private get wrapperStyles(): {width?: string} {
    const width = this.props.width;

    if (!width) {
      return {width: '200px'};
    }

    return {width: getCSSUnitValue(width)};
  }

  constructor(props: CardGenericViewSmallProps) {
    super(props);

    this.state = {
      isMenuExpanded: false
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

  renderCard() {
    const {loading, mediaType, thumbnailUrl, title, subtitle} = this.props;

    return this.formatCard((
      <RoundedBackground>
        <CardContentSmall
          loading={loading}
          mediaType={mediaType || 'unknown'}
          dataURI={thumbnailUrl}
        />
      </RoundedBackground>
    ), (
      <FileInfoWrapper>
        <Title className="title">{title}</Title>
        <Size className="size">{subtitle}</Size>
      </FileInfoWrapper>
    ));
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

    return this.formatCard(<ErrorIcon />, (
      <div>
        <Error className="error">{error}</Error>
        {retryComponent}
      </div>
    ));
  }

  private formatCard(left: JSX.Element, right: JSX.Element) {
    const {actions, loading, mediaType, thumbnailUrl, onClick, onMouseEnter} = this.props;
    const cardStyle = this.wrapperStyles;
    const cardClass = cx({loading: loading});
    const imgClass = cx('img-wrapper', {shadow: mediaType === 'image' && thumbnailUrl});

    return (
      <SmallCard style={cardStyle} className={cardClass} onClick={onClick} onMouseEnter={onMouseEnter}>
        <ImgWrapper className={imgClass}>
          {left}
        </ImgWrapper>
        <InfoWrapper className="info-wrapper">
          {right}
        </InfoWrapper>
        <Menu actions={actions} />
      </SmallCard>
    );
  }
}
