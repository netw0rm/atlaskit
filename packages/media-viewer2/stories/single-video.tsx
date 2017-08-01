import * as React from 'react';
import { PureComponent } from 'react';
import MediaViewer from '../src';
import { createStorybookContext, defaultCollectionName, videoFileId } from '@atlaskit/media-test-helpers';

export interface State {}

export class SingleVideoStory extends PureComponent<Props, State> {
  render() {
    return (
      <MediaViewer
        context={createStorybookContext()}
        mediaItem={videoFileId}
        collectionName= {defaultCollectionName}
      />
    );
  }
}
