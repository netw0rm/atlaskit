import * as React from 'react';
import {Component, MouseEvent} from 'react';
import * as bytes from 'bytes';
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
        onRetry.handler(undefined, event.nativeEvent);
      };
      const retryComponent = (onRetry) ? (
        <Retry>
          <span onClick={retryHandler}>{retryMessage}</span>
        </Retry>
      ) : null;

      return this.formatCard((
        <ErrorIcon />
      ), (
        <div>
          <Error>{error}</Error>
          {retryComponent}
        </div>
      ));
    } else {
      const fileSize = this.props.mediaSize && bytes.format(this.props.mediaSize, {unitSeparator: ' '});

      return this.formatCard((
        <RoundedBackground>
          <CardContentSmall
            loading={this.props.loading}
            mediaType={this.props.mediaType}
            dataURI={this.props.dataURI}
          />
        </RoundedBackground>
      ), (
        <div>
          <Title>{this.props.mediaName}</Title>
          <Size>{fileSize}</Size>
        </div>
      ));
    }
  }

  onClick(event: MouseEvent<HTMLDivElement>) {
    this.props.onClick(event.nativeEvent);
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
