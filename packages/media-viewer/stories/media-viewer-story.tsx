import * as React from 'react';
import {Component} from 'react';
import { storiesOf, action } from '@kadira/storybook';
import {createStorybookContext, defaultCollectionName, videoFileId, audioFileId, docFileId, wideImageFileId, largeImageFileId, smallImageFileId, genericFileId} from '@atlaskit/media-test-helpers';
import {MediaViewer} from '../src';
import {MediaIdentifier} from '../src/3.0/domain';

const context = createStorybookContext();
const onPreviewChanged = (item: MediaIdentifier) => {
  action('selection changed', item);
}

storiesOf('MediaViewer', {})
  .add('Image', () => (
    <MediaViewer
      isVisible={true}
      context={context}        
      onPreviewChanged={onPreviewChanged}
      navigation={{
        initialItem: wideImageFileId
      }}
    />
  ))
  .add('Audio', () => (
    <MediaViewer
      isVisible={true}
      context={context}        
      onPreviewChanged={onPreviewChanged}
      navigation={{
        initialItem: audioFileId
      }}
    />
  ))  
  .add('Video', () => (
    <MediaViewer
      isVisible={true}
      context={context}        
      onPreviewChanged={onPreviewChanged}
      navigation={{
        initialItem: videoFileId
      }}
    />
  ))
 .add('PDF', () => (
    <MediaViewer
      isVisible={true}
      context={context}        
      onPreviewChanged={onPreviewChanged}
      navigation={{
        initialItem: docFileId
      }}
    />
  ))  
  .add('List using array of items', () => (
    <MediaViewer
      isVisible={true}
      context={context}
      onPreviewChanged={onPreviewChanged}
      navigation={{
        initialItem: largeImageFileId,
        list: [wideImageFileId, genericFileId, videoFileId, audioFileId, docFileId, largeImageFileId, smallImageFileId]
      }}
    />
  ))
  .add('List using collection', () => (
    <MediaViewer
      isVisible={true}
      context={context}
      onPreviewChanged={onPreviewChanged}
      navigation={{
        initialItem: genericFileId,
        collectionName: defaultCollectionName
      }}
    />
  ))
  .add('Open/Close', () => {
    class MediaViewerLauncher extends Component<any, any> {
      state = {
        isVisible: false
      }

      render() {
        const {isVisible} = this.state;

        return (
          <div>
            <button onClick={this.onClick}>Show MediaViewer</button>
            <MediaViewer
              isVisible={isVisible}
              context={context}
              onPreviewChanged={onPreviewChanged}
              navigation={{
                initialItem: largeImageFileId,
                collectionName: defaultCollectionName
              }}
              onClose={this.onClose}
            />
          </div>
        );
      }

      onClose = () => {
        this.setState({isVisible: false});
      }
      onClick = () => {
        this.setState({isVisible: true});
      }
    }

    return <MediaViewerLauncher />;
  });
