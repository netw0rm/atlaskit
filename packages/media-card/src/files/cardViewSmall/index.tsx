import * as React from 'react';
import * as cx from 'classnames';
import {Component, MouseEvent} from 'react';
import {CardAction, MediaType} from '@atlaskit/media-core';

import {CardContentSmall} from './cardContentSmall/cardContentSmall';
import {toHumanReadableMediaSize, getCSSUnitValue, Menu, ErrorIcon} from '../../utils';

import {Error, Title, Size, Retry, SmallCard, ImgWrapper, RoundedBackground, InfoWrapper, FileInfoWrapper} from './styled';

export interface FileCardViewSmallProps {
  width?: number | string;

  mediaName?: string;
  mediaType?: MediaType;
  mediaSize?: number;

  dataURI?: string;
  progress?: number;
  loading?: boolean;

  actions?: Array<CardAction>;
  onClick?: (event: Event) => void;

  error?: string;
  onRetry?: CardAction;
}

export interface FileCardViewSmallState {
  isMenuExpanded: boolean;
}

export class FileCardViewSmall extends Component<FileCardViewSmallProps, FileCardViewSmallState> {
  private get wrapperStyles(): {width?: string} {
    const width = this.props.width;

    if (!width) {
      return {};
    }

    return {width: getCSSUnitValue(width)};
  }

  constructor(props: FileCardViewSmallProps) {
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
        </FileInfoWrapper>
      ));
    }
  }

  onClick(event: MouseEvent<HTMLDivElement>) {
    this.props.onClick && this.props.onClick(event.nativeEvent);
  }

  formatCard(left: JSX.Element, right: JSX.Element) {
    const {actions} = this.props;
    const cardStyle = this.wrapperStyles;
    const cardClass = cx({loading: this.props.loading});
    const imgClass = cx('img-wrapper', {shadow: this.props.mediaType === 'image' && this.props.dataURI});

    return (
      <SmallCard style={cardStyle} className={cardClass} onClick={this.onClick.bind(this)}>
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
