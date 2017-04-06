/* tslint:disable:variable-name */
import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import {ImageNavigator} from '../../src/image-navigator/index';

const url = 'https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg';

storiesOf('Image navigator', {})
  .add('default', () => (
    <ImageNavigator imageSource={url} />
  ));
