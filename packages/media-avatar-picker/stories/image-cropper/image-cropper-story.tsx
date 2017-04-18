/* tslint:disable:variable-name */
import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';
import {ImageCropper} from '../../src/image-cropper';

const url = 'https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg';
const naturalWidth = 5360;

storiesOf('Stateless image cropper', {})
  .add('default', () => (
      <ImageCropper imageSource={url} imageWidth={naturalWidth} scale={0.08} top={-80} left={-80} onDragStarted={action('DragStarted')} />
  ))
  .add('when image width is not set', () => (
    <ImageCropper imageSource={url} scale={0.14} top={-50} left={-115} />
  ))
  .add('with custom container size', () => (
    <ImageCropper imageSource={url} imageWidth={naturalWidth} scale={0.14} top={-50} left={-115} containerSize={400} />
  ))
  .add('with circular mask', () => (
    <ImageCropper imageSource={url} imageWidth={naturalWidth} scale={0.08} top={-70} left={-90} isCircularMask={true} />
  ));
