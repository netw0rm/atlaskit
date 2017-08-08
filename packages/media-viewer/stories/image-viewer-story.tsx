import * as React from 'react';
import { storiesOf } from '@kadira/storybook';
import { createStorybookContext, wideImageFileId, largeImageFileId } from '@atlaskit/media-test-helpers';
import {ImageViewer} from '../src/3.0/viewers/image';

const context = createStorybookContext();
const badFileId = {
  ...wideImageFileId,
  id: 'badId'
}

storiesOf('Image Viewer', {})
 .add('Image View', () => (
    <ImageViewer
      context={context}
      identifier={wideImageFileId}
      metadata={{
        type: 'file',
        details: {
          id: wideImageFileId.id
        }
      }}
    />
  ))
 .add('Large Image', () => (
    <ImageViewer
      context={context}
      identifier={largeImageFileId}
      metadata={{
        type: 'file',
        details: {
          id: largeImageFileId.id
        }
      }}
    />
  ))
 .add('Error loading image', () => (
    <ImageViewer
      context={context}
      identifier={badFileId}
      metadata={{
        type: 'file',
        details: {
          id: badFileId.id
        }
      }}
    />
  ));