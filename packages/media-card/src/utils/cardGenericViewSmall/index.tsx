import * as React from 'react';
import * as cx from 'classnames';
import {Component, MouseEvent} from 'react';
import {CardAction, MediaType} from '@atlaskit/media-core';

import {CardContentSmall} from './cardContentSmall/cardContentSmall';
import {Menu, ErrorIcon, getCSSUnitValue} from '../../utils';

import {Error, Title, Size, Retry, SmallCard, ImgWrapper, RoundedBackground, InfoWrapper, FileInfoWrapper} from './styled';

export interface CardGenericViewSmallProps {
  width?: number | string;
  title?: string;
  subtitle?: string;
  mediaType?: MediaType;
  thumbnailUrl?: string;
  loading?: boolean;
  menuActions?: Array<CardAction>;
  onClick?: (event: Event) => void;
  error?: string;
  onRetry?: CardAction;
}

export interface CardGenericViewSmallState {
  isMenuExpanded: boolean;
}

export class CardGenericViewSmall extends Component<CardGenericViewSmallProps, CardGenericViewSmallState> {
  private get wrapperStyles(): {width?: string} {
    const width = this.props.width;

    if (!width) {
      return {};
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
    const {error, onRetry, loading, mediaType, thumbnailUrl, title, subtitle} = this.props;

    if (error) {
      const retryMessage = (onRetry) ? (onRetry.label || 'Try again') : '';
      const retryHandler = (event: MouseEvent<HTMLSpanElement>) => {
        // We need to prevent the card's onClick being called
        event.stopPropagation();
        event.preventDefault();
        onRetry && onRetry.handler(undefined, event.nativeEvent);
      };
      const retryComponent = (onRetry) ? (
        <Retry className="retry">
          <span onClick={retryHandler}>{retryMessage}</span>
        </Retry>
      ) : null;

      return this.formatCard((
        <ErrorIcon />
      ), (
        <div>
          <Error className="error">{error}</Error>
          {retryComponent}
        </div>
      ));
    } else {
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
  }

  onClick = (event: MouseEvent<HTMLDivElement>) => {
    this.props.onClick && this.props.onClick(event.nativeEvent);
  }

  formatCard(left: JSX.Element, right: JSX.Element) {
    const {menuActions, width, loading, mediaType, thumbnailUrl} = this.props;
    const cardStyle = this.wrapperStyles;
    const cardClass = cx({loading: loading});
    const imgClass = cx('img-wrapper', {shadow: mediaType === 'image' && thumbnailUrl});

    return (
      <SmallCard style={cardStyle} className={cardClass} onClick={this.onClick}>
        <ImgWrapper className={imgClass}>
          {left}
        </ImgWrapper>
        <InfoWrapper className="info-wrapper">
          {right}
        </InfoWrapper>
        <Menu actions={menuActions} />
      </SmallCard>
    );
  }
}
