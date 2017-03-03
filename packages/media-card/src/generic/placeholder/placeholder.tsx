/* tslint:disable:variable-name */
import * as React from 'react';
import {Component} from 'react';
import {PlaceholderWrapper} from './styled';
import {MediaType} from '@atlaskit/media-core';
import fallbackUnknown from '@atlaskit/icon/glyph/file';
import fallbackPlay from '@atlaskit/icon/glyph/play';

export interface PlaceholderProps {
  mediaType?: MediaType;
}

export class Placeholder extends Component<PlaceholderProps, {}> {
  render() {
    const type = this.props.mediaType || 'unknown';
    const Icon = this.iconforMediaType(type);

    return (
      <PlaceholderWrapper className={'placeholder-wrapper'}>
        <Icon label="placeholder"/>
      </PlaceholderWrapper>
    );
  }

  iconforMediaType(mediaType: MediaType) {
    switch (mediaType) {
      case 'doc': return fallbackUnknown;
      case 'image': return fallbackUnknown;
      case 'audio': return fallbackPlay;
      case 'video': return fallbackPlay;
      case 'unknown': return fallbackUnknown;
      default: return fallbackUnknown; // MEDIA-TODO: Create an icon for this
    }
  }
}
