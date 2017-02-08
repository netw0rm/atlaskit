import * as React from 'react';
import {Component} from 'react';
import * as styles from 'style!./placeholderSmall.less';
import {MediaTypes} from '@atlaskit/media-domain';
import {Placeholder} from '../../placeholder';
import {FileIcon} from '../../fileIcon';

export interface PlaceholderProps {
  mediaType: MediaTypes.MediaType;
}

export class PlaceholderSmall extends Component<PlaceholderProps, {}> {
  render() {
    return (
      <div className={styles['placeholderSmall']} >
        <Placeholder mediaType={this.props.mediaType} />
        <div className={styles['fileTypeIcon']}>
          <FileIcon mediaType={this.props.mediaType}/>
        </div>
      </div>
    );
  }
}
