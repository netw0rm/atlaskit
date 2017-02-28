import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {toHumanReadableMediaSize} from '../utils/index';
import {CardAction} from '@atlaskit/media-core';
import {CardContentSmall} from './cardContentSmall/cardContentSmall';
import {ErrorIcon} from '..';
import {Error, Title, Size, Retry, SmallCard, ImgWrapper, RoundedBackground, InfoWrapper} from './styled';

/* Child stateless components*/
import {MediaType} from '@atlaskit/media-core';

export interface CardViewSmallProps {
  width?: number;

  mediaName?: string;
  mediaType?: MediaType;
  mediaSize?: number;

  dataURI?: string;
  progress?: number;
  loading?: boolean;

  menuActions?: Array<CardAction>;
  onClick?: (event: Event) => void;

  error?: string;
  onRetry?: CardAction;
}

export class CardViewSmall extends Component<CardViewSmallProps, {}> {
  render() {
    const error = this.props.error;

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
      const fileSize = this.props.mediaSize && toHumanReadableMediaSize(this.props.mediaSize);

      return this.formatCard((
        <RoundedBackground>
          <CardContentSmall
            loading={this.props.loading}
            mediaType={this.props.mediaType || 'unknown'}
            dataURI={this.props.dataURI}
          />
        </RoundedBackground>
      ), (
        <div>
          <Title className="title">{this.props.mediaName}</Title>
          <Size className="size">{fileSize}</Size>
        </div>
      ));
    }
  }

  onClick(event: MouseEvent<HTMLDivElement>) {
    this.props.onClick && this.props.onClick(event.nativeEvent);
  }

  formatCard(left: JSX.Element, right: JSX.Element) {
    const cardStyle = this.props.width ? {width: `${this.props.width}px`} : {};
    return (
      <SmallCard style={cardStyle} onClick={this.onClick.bind(this)}>
        <ImgWrapper>
          {left}
        </ImgWrapper>
        <InfoWrapper>
          {right}
        </InfoWrapper>
      </SmallCard>
    );
  }
}
