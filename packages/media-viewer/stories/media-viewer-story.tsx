import * as React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import {createStorybookContext, defaultCollectionName, videoFileId, wideImageFileId, largeImageFileId, smallImageFileId, genericFileId} from '@atlaskit/media-test-helpers';
import {MediaViewer, MediaIdentifier} from '../src/3.0';

const context = createStorybookContext();
const onPreviewChanged = (item: MediaIdentifier) => {
  action('selection changed', item);
}

storiesOf('MediaViewer', {})
  .add('Single item', () => {
    return (
      <MediaViewer
        context={context}        
        onPreviewChanged={onPreviewChanged}
        navigation={{
          initialItem: genericFileId
        }}
      />
    );
  })
  .add('List using array of items', () => {
    return (
      <MediaViewer
        context={context}
        onPreviewChanged={onPreviewChanged}
        navigation={{
          initialItem: genericFileId,
          list: [wideImageFileId, genericFileId, videoFileId, largeImageFileId, smallImageFileId]
        }}
      />
    );
  })
  .add('List using collection', () => {
    return (
      <MediaViewer
        context={context}
        onPreviewChanged={onPreviewChanged}
        navigation={{
          initialItem: genericFileId,
          collectionName: defaultCollectionName
        }}
      />
    );
  });
