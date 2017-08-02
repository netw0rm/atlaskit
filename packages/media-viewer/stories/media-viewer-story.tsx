import * as React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import {createStorybookContext, defaultCollectionName, videoFileId, audioFileId, docFileId, wideImageFileId, largeImageFileId, smallImageFileId, genericFileId} from '@atlaskit/media-test-helpers';
import {MediaViewer, MediaIdentifier} from '../src/3.0';

const context = createStorybookContext();
const onPreviewChanged = (item: MediaIdentifier) => {
  action('selection changed', item);
}

storiesOf('MediaViewer', {})
  .add('Image', () => {
    return (
      <MediaViewer
        context={context}        
        onPreviewChanged={onPreviewChanged}
        navigation={{
          initialItem: wideImageFileId
        }}
      />
    );
  })
  .add('Audio', () => {
    return (
      <MediaViewer
        context={context}        
        onPreviewChanged={onPreviewChanged}
        navigation={{
          initialItem: audioFileId
        }}
      />
    );
  })  
  .add('Video', () => {
    return (
      <MediaViewer
        context={context}        
        onPreviewChanged={onPreviewChanged}
        navigation={{
          initialItem: videoFileId
        }}
      />
    );
  })
 .add('PDF', () => {
    return (
      <MediaViewer
        context={context}        
        onPreviewChanged={onPreviewChanged}
        navigation={{
          initialItem: docFileId
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
          list: [wideImageFileId, genericFileId, videoFileId, audioFileId, docFileId, largeImageFileId, smallImageFileId]
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
