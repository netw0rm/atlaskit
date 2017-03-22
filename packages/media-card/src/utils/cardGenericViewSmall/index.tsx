import * as React from 'react';
import * as cx from 'classnames';
import {Component, MouseEvent} from 'react';
import {CardAction, MediaType} from '@atlaskit/media-core';

import {CardContentSmall} from './cardContentSmall/cardContentSmall';
import {Menu, ErrorIcon} from '../../utils';

import {Error, Title, Size, Retry, SmallCard, ImgWrapper, RoundedBackground, InfoWrapper, FileInfoWrapper} from './styled';

export interface CardGenericViewSmallProps {
  width?: number;
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
  constructor(props: CardGenericViewSmallProps) {
    super(props);

    this.state = {
      isMenuExpanded: false
    };
  }

  render() {
    const {error} = this.props;

    if (error) {
      const onRetry = this.props.onRetry;
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
            loading={this.props.loading}
            mediaType={this.props.mediaType || 'unknown'}
            dataURI={this.props.dataURI}
          />
        </RoundedBackground>
      ), (
        <FileInfoWrapper>
          <Title className="title">{this.props.title}</Title>
          <Size className="size">{this.props.subtitle}</Size>
        </FileInfoWrapper>
      ));
    }
  }

  onClick = (event: MouseEvent<HTMLDivElement>) => {
    this.props.onClick && this.props.onClick(event.nativeEvent);
  }

  formatCard(left: JSX.Element, right: JSX.Element) {
    const {menuActions} = this.props;
    const cardStyle = this.props.width ? {width: `${this.props.width}px`} : {};
    const cardClass = cx({loading: this.props.loading});
    const imgClass = cx('img-wrapper', {shadow: this.props.mediaType === 'image' && this.props.dataURI});

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
