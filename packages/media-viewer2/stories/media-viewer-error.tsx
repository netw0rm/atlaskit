import * as React from 'react';
import { PureComponent } from 'react';
import MediaViewer from '../src';
import { createStorybookContext } from '@atlaskit/media-test-helpers';

export interface State {}
export interface Props {}

export class MediaViewerError extends PureComponent<Props, State> {
  render() {
    return (
      <MediaViewer
        context={createStorybookContext()}
        mediaItem={undefined}
        collectionName='invalid collection'
      />
    );
  }
}
