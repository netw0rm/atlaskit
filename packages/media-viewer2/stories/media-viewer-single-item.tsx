import * as React from 'react';
import { PureComponent } from 'react';
import MediaViewer from '../src';
import { createStorybookContext, defaultCollectionName, imageFileId } from '@atlaskit/media-test-helpers';

export interface State {}
export interface Props {}

export class MediaViewerSingleItemStory extends PureComponent<Props, State> {
  render() {
    return (
      <MediaViewer
        context={createStorybookContext()}
        mediaItem={imageFileId}
        collectionName= {defaultCollectionName}
      />
    );
  }
}
