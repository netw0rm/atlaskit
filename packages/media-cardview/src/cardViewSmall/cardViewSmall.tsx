import * as React from 'react';
import styled from 'styled-components';
import {Component, MouseEvent} from 'react';
import * as bytes from 'bytes';
import {Actions, MediaTypes} from '@atlaskit/media-domain';
import {CardContentSmall} from './cardContentSmall/cardContentSmall';
import {ErrorIcon} from '../errorIcon';
import { akColorN70, akColorN20, akColorN30 } from '@atlaskit/util-shared-styles';

export interface CardViewSmallProps {
  width?: number;

  mediaName?: string;
  mediaType?: MediaTypes.MediaType;
  mediaSize?: number;

  dataURI?: string;
  progress?: number;
  loading?: boolean;

  menuActions?: Array<Actions.CardAction>;
  onClick?: (event: Event) => void;

  error?: string;
  onRetry?: Actions.CardAction;
}

export const DEFAULT_SMALL_CARD_DIMENSIONS = {
  WIDTH: 192
};

// MEDIA-FIX: Remove style vendor prefixes

const Retry = styled.div`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: bold;
  color: #0065FF;
  font-size: 12px;
  line-height: 15px;
  overflow: hidden;
  max-width: ~"calc(100%)";
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 2px;
`;

const Error = styled.div`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: bold;
  color: ${akColorN70};
  font-size: 12px;
  line-height: 15px;
  overflow: hidden;
  max-width: ~"calc(100%)";
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Title = styled.div`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: bold;
  color: #091E42;
  font-size: 12px;
  line-height: 15px;
  overflow: hidden;
  max-width: ~"calc(100%)";
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Size = styled.div`
  color: ${akColorN70};
  font-size: 12px;
  line-height: 15px;
  overflow: hidden;
  max-width: ~"calc(100%)";
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 2px;
`;

const SmallCard = styled.div`
  background-color: ${akColorN20};
  border-radius: 3px;
  font-family: sans-serif;
  cursor: pointer;
  box-sizing: border-box;
  height: 42px;
  padding: 5px;
  width: ${props => props.width}
  &:hover {
    background-color: ${akColorN30};
  }
  &:hover > .title {
    color: #0065FF;
  }
`;

// TODO: Should we move the img styles inside of the content component?
const ImgWrapper = styled.div`
  min-width: 32px;
  min-height: 32px;
  max-width: 32px;
  max-height: 32px;
  overflow: hidden;
  position: relative;
  display: inline-block;
  vertical-align: middle;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    max-height: 100%;
    max-width: 100%;
    display: block;
    transform: translate(-50%, -50%);
  }
`;

const InfoWrapper = styled.div`
  display: inline-block;
  padding-left: 8px;
  position: relative;
  max-width: ~"calc(100% - 40px)";
  vertical-align: middle;
`;

const RoundedBackground = styled.div`
  min-width: 32px;
  min-height: 32px;
  background-color: #FAFBFC;
  border-radius: 3px;
`;

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
        <Retry>
          <span onClick={retryHandler}>{retryMessage}</span>
        </Retry>
      ) : null;

      return this.formatCard((
        <ErrorIcon width={32} height={30} />
      ), (
        <div>
          <Error>{error}</Error>
          {retryComponent}
        </div>
      ));
    } else {
      const fileSize = this.props.mediaSize && bytes.format(this.props.mediaSize, {unitSeparator: ' '});
      const mediaType = this.props.mediaType ? this.props.mediaType : 'unknown';

      return this.formatCard((
        <RoundedBackground>
          <CardContentSmall
            loading={this.props.loading}
            mediaType={mediaType}
            dataURI={this.props.dataURI}
          />
        </RoundedBackground>
      ), (
        <div>
          <Title className="title">{this.props.mediaName}</Title>
          <Size>{fileSize}</Size>
        </div>
      ));
    }
  }

  onClick(event: MouseEvent<HTMLDivElement>) {
    this.props.onClick && this.props.onClick(event.nativeEvent);
  }

  formatCard(left: JSX.Element, right: JSX.Element) {
    const width = this.props.width || DEFAULT_SMALL_CARD_DIMENSIONS.WIDTH;

    return (
      <SmallCard width={`${width}px`} onClick={this.onClick.bind(this)}>
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
