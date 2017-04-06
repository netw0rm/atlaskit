/* tslint:disable:variable-name */
import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import {StatelessImageCropper} from '../../src/image-cropper/Stateless';

const url = 'https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg';
storiesOf('Image cropper', {})
  .add('default', () => (
      <StatelessImageCropper imageSource={url} imageWidth={500} top={-80} left={-80} />
  ))
  .add('with custom container size', () => (
    <StatelessImageCropper imageSource={url} imageWidth={700} top={-50} left={-80} containerSize={400} />
  ))
  .add('with circular mask', () => (
    <StatelessImageCropper imageSource={url} imageWidth={500} top={-80} left={-80} isCircularMask={true} />
  ));
