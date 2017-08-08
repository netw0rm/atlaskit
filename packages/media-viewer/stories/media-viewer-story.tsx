import * as React from 'react';
import {Component} from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { tallImage, wideImage, smallImage, wideTransparentImage } from '@atlaskit/media-test-helpers';
import {createStorybookContext, defaultCollectionName, videoFileId, audioFileId, docFileId, largePdfFileId, wideImageFileId, largeImageFileId, smallImageFileId, genericFileId} from '@atlaskit/media-test-helpers';
import {MediaViewer} from '../src';
import {MediaIdentifier} from '../src/3.0/domain';
import {Img} from './styled';

const context = createStorybookContext();
const onPreviewChanged = (item: MediaIdentifier) => {
  action('selection changed', item);
};

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
 .add('Large PDF (100MB)', () => (
    <MediaViewer
      isVisible={true}
      context={context}
      onPreviewChanged={onPreviewChanged}
      navigation={{
        initialItem: largePdfFileId
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
        list: [wideImageFileId, genericFileId, videoFileId, audioFileId, largePdfFileId, largeImageFileId, smallImageFileId]
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
        isVisible: false,
        openerElement: undefined
      };

      render() {
        const {isVisible, openerElement} = this.state;

        return (
          <div>
            <Img src={tallImage} style={{top: 100, left: 100}} onClick={this.onClick} />
            <Img src={wideImage} style={{bottom: 10, right: 50}} onClick={this.onClick} />
            <Img src={wideTransparentImage} style={{top: 200, right: 200}} onClick={this.onClick} />
            <Img src={smallImage} style={{bottom: 100, left: 300}} onClick={this.onClick} />
            <MediaViewer
              openerElement={openerElement}
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

      onClick = (e) => {
        const {target} = e;

        this.setState(() => {
          return {
            openerElement: target
          };
        }, () => {
          this.setState({isVisible: true});
        });
      }
    }

    return <MediaViewerLauncher />;
  });
