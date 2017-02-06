import * as React from 'react';
import Component = React.Component;
import styles from 'style!./styles.less';
import {MediaTypes} from '@atlaskit/media-domain';

export interface PlaceholderProps {
  mediaType: MediaTypes.MediaType;
}

export class Placeholder extends Component<PlaceholderProps, {}> {
  render() {
    return (
      <div className={this.classforMediaType(this.props.mediaType)} />
    );
  }

  classforMediaType(mediaType: MediaTypes.MediaType) {
    switch (mediaType) {
      case 'doc': return styles['fallbackUnknown'];
      case 'image': return styles['fallbackUnknown'];
      case 'audio': return styles['fallbackAudio'];
      case 'video': return styles['fallbackVideo'];
      case 'unknown': return styles['fallbackUnknown'];
      default: return styles['fallback'];
    }
  }
}