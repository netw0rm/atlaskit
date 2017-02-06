import * as React from 'react';
import * as styles from './cardView.less'; // MEDIA-FIX
import {Component, MouseEvent} from 'react';
import {Actions} from '@atlaskit/media-domain';

/* Child stateless components*/
import {CardContent} from './cardContent/cardContent';
import {CardOverlay} from './cardOverlay/cardOverlay';
import {MediaTypes} from '@atlaskit/media-domain';

export interface CardViewProps {
  height?: number;
  width?: number;

  mediaName?: string;
  mediaType?: MediaTypes.MediaType;
  mediaSize?: number;

  dataURI?: string;
  progress?: number;
  loading?: boolean;

  selectable?: boolean;
  selected?: boolean;

  menuActions?: Array<Actions.CardAction>;
  onClick?: (event: Event) => void;
}

export const DEFAULT_CARD_DIMENSIONS = {
  WIDTH: 156,
  HEIGHT: 104
};


export class CardView extends Component<CardViewProps, {}> {
  render() {
    const height = this.props.height || DEFAULT_CARD_DIMENSIONS.HEIGHT;
    const width = this.props.width || DEFAULT_CARD_DIMENSIONS.WIDTH;

    const cardStyle  = {height: `${height}px`, width: `${width}px`};

    return (
      <div style={cardStyle} className={styles['card']} onClick={this.onClick.bind(this)}>
        <div className={styles['wrapper']}>
          <div className={styles['imgWrapper']}>
            <CardContent
              loading={this.props.loading}
              mediaType={this.props.mediaType}
              dataURI={this.props.dataURI}
            />
          </div>
        </div>
        <CardOverlay
          selectable={this.props.selectable}
          selected={this.props.selected}

          mediaName={this.props.mediaName}
          mediaType={this.props.mediaType}
          mediaSize={this.props.mediaSize}
          progress={this.props.progress}

          menuActions={this.props.menuActions}
        />
      </div>
    );
  }

  onClick(event: MouseEvent<HTMLDivElement>) {
    this.props.onClick(event.nativeEvent);
  }
}
