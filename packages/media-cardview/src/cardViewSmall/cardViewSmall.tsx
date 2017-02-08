import * as React from 'react';
import * as styles from 'style!./cardViewSmall.less';
import {Component, MouseEvent} from 'react';
import * as bytes from 'bytes';
import {Actions, MediaTypes} from '@atlaskit/media-domain';
import {CardContentSmall} from './cardContentSmall/cardContentSmall';
import {ErrorIcon} from '../errorIcon';

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
        <div className={styles['retry']}>
          <span onClick={retryHandler}>{retryMessage}</span>
        </div>
      ) : null;

      return this.formatCard((
        <ErrorIcon width={32} height={30} />
      ), (
        <div>
          <div className={styles['error']}>{error}</div>
          {retryComponent}
        </div>
      ));
    } else {
      const fileSize = this.props.mediaSize && bytes.format(this.props.mediaSize, {unitSeparator: ' '});
      const mediaType = this.props.mediaType ? this.props.mediaType : 'unknown';

      return this.formatCard((
        <div className={styles['roundedBackground']}>
          <CardContentSmall
            loading={this.props.loading}
            mediaType={mediaType}
            dataURI={this.props.dataURI}
          />
        </div>
      ), (
        <div>
          <div className={styles['title']}>{this.props.mediaName}</div>
          <div className={styles['size']}>{fileSize}</div>
        </div>
      ));
    }
  }

  onClick(event: MouseEvent<HTMLDivElement>) {
    this.props.onClick && this.props.onClick(event.nativeEvent);
  }

  formatCard(left: JSX.Element, right: JSX.Element) {
    const width = this.props.width || DEFAULT_SMALL_CARD_DIMENSIONS.WIDTH;
    const cardStyle = {width: `${width}px`};

    return (
      <div style={cardStyle} className={styles['smallCard']} onClick={this.onClick.bind(this)}>
        <div className={styles['imgWrapper']}>
          {left}
        </div>
        <div className={styles['infoWrapper']}>
          {right}
        </div>
      </div>
    );
  }
}
