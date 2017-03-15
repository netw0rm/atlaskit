import * as React from 'react';
import {Card} from './styled';
import {Component, MouseEvent} from 'react';
import {CardAction} from '@atlaskit/media-core';

/* Child stateless components*/
import {CardContent} from '../cardContent/cardContent';
import {CardOverlay} from '../cardOverlay/cardOverlay';
import {MediaType} from '@atlaskit/media-core';

export interface CardViewProps {
  height?: number;
  width?: number;

  mediaName?: string;
  mediaType?: MediaType;
  mediaSize?: number;

  dataURI?: string;
  progress?: number;
  loading?: boolean;

  selectable?: boolean;
  selected?: boolean;

  menuActions?: Array<CardAction>;
  onClick?: (event: Event) => void;

  error?: string;
  onRetry?: CardAction;
}

export const DEFAULT_CARD_DIMENSIONS = {
  WIDTH: 156,
  HEIGHT: 104
};


export class CardView extends Component<CardViewProps, {}> {
  render() {
    const height = this.props.height || DEFAULT_CARD_DIMENSIONS.HEIGHT;
    const width = this.props.width || DEFAULT_CARD_DIMENSIONS.WIDTH;
    const cardStyle = {height: `${height}px`, width: `${width}px`};
    const error = this.props.error;

    if (error) {
      return (
        <Card style={cardStyle} className={'card'} onClick={this.onClick.bind(this)}>
          <div className={'wrapper'} />
          <CardOverlay
            persistent={true}
            mediaName={this.props.mediaName}
            mediaType={this.props.mediaType}
            error={error}
            onRetry={this.props.onRetry}
            menuActions={this.props.menuActions}
            height={height}
            width={width}
          />
        </Card>
      );
    } else {
      const isPersistent = !(this.isPreviewable && this.props.dataURI);
      const overlay = this.props.loading ? false : <CardOverlay
        persistent={isPersistent}
        selectable={this.props.selectable}
        selected={this.props.selected}

        mediaName={this.props.mediaName}
        mediaType={this.props.mediaType}
        mediaSize={this.props.mediaSize}
        progress={this.props.progress}

        menuActions={this.props.menuActions}
        height={height}
        width={width}
      />;
      return (
        <Card style={cardStyle} className={'card'} onClick={this.onClick.bind(this)}>
          <div className={'wrapper'}>
            <div className={'img-wrapper'}>
              <CardContent
                loading={this.props.loading}
                mediaType={this.props.mediaType}
                dataURI={this.props.dataURI}
                isPreviewable={this.isPreviewable}
              />
            </div>
            {overlay}
          </div>
        </Card>
      );
    }
  }

  private get isPreviewable() {
    return ['image', 'video'].indexOf(this.props.mediaType) > -1;
  }

  onClick(event: MouseEvent<HTMLDivElement>) {
    this.props.onClick && this.props.onClick(event.nativeEvent);
  }
}

export default CardView;
