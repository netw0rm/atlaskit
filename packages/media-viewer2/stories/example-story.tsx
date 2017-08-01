import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';
import {MediaViewerSingleItemStory} from './media-viewer-single-item';
import {SingleVideoStory} from './single-video';
import {MediaViewerError} from './media-viewer-error';

storiesOf(name, module)
  .add('open single image', () => (
    <MediaViewerSingleItemStory />
  )).add('single video', () => (
    <SingleVideoStory />
  )).add('error', () => (
    <MediaViewerError />
  ));
