/* tslint:disable:variable-name */
import * as React from 'react';
import {Component} from 'react';
import {PlaceholderWrapper} from '../../styled';
import {MediaType} from '@atlaskit/media-core';
import Icon from '@atlaskit/icon/glyph/file';

export interface PlaceholderProps {
  mediaType?: MediaType;
}

export class Placeholder extends Component<PlaceholderProps, {}> {
  render() {
    return (
      <PlaceholderWrapper className={'placeholder-wrapper'}>
        <Icon label="placeholder" size="medium" />
      </PlaceholderWrapper>
    );
  }
}
