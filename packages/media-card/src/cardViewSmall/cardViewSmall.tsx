import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {toHumanReadableMediaSize} from '../utils/index';
import {CardAction} from '@atlaskit/media-core';
import {CardContentSmall} from './cardContentSmall/cardContentSmall';
import {Dropdown} from '../dropdown/dropdown';
import {ErrorIcon} from '../generic/errorIcon/errorIcon';
import {Error, Title, Size, Retry, SmallCard, ImgWrapper, RoundedBackground, InfoWrapper, FileInfoWrapper} from './styled';

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

export interface CardViewSmallState {
  isMenuExpanded: boolean;
}

export class CardViewSmall extends Component<CardViewSmallProps, CardViewSmallState> {
  constructor(props: CardViewSmallProps) {
    super(props);

    this.state = {
      isMenuExpanded: false
    };
  }

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
        <FileInfoWrapper>
          <Title className="title">{this.props.mediaName}</Title>
          <Size className="size">{fileSize}</Size>
          {this.dropdown()}
        </FileInfoWrapper>
      ));
    }
  }

  dropdown() {
    if (!this.state.isMenuExpanded) { return null; }

    return <div onClick={this.dropdownClick}>
      <Dropdown items={this.props.menuActions}/>
    </div>;
  }

  dropdownClick(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  onClick(event: MouseEvent<HTMLDivElement>) {
    this.props.onClick && this.props.onClick(event.nativeEvent);
  }

  formatCard(left: JSX.Element, right: JSX.Element) {
    const cardStyle = this.props.width ? {width: `${this.props.width}px`} : {};
    const className = this.props.loading ? 'loading' : '';
    const shadowClass = this.props.mediaType === 'image' && this.props.dataURI ? 'shadow' : '';

    return (
      <SmallCard style={cardStyle} className={className} onClick={this.onClick.bind(this)}>
        <ImgWrapper className={`img-wrapper ${shadowClass}`}>
          {left}
        </ImgWrapper>
        <InfoWrapper className="info-wrapper">
          {right}
        </InfoWrapper>
      </SmallCard>
    );
  }
}
