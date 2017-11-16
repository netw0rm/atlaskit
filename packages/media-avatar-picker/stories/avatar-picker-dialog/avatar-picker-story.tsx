import {storiesOf, action} from '@kadira/storybook';
import * as React from 'react';

import {Avatar, AvatarPickerDialog} from '../../src';
import {generateAvatars} from '../utils';
import {tallImage} from '@atlaskit/media-test-helpers';

const avatars: Array<Avatar> = generateAvatars(30);

storiesOf('Avatar Picker', {})
  .add('With imageSource', () => (
    <AvatarPickerDialog
      avatars={avatars}
      imageSource={tallImage}
      onImagePicked={action('onImagePicked')}
      onAvatarPicked={action('onAvatarPicked')}
      onCancel={action('onCancel')}
    />
  ))
  .add('Without imageSource', () => (
    <AvatarPickerDialog
      avatars={avatars}
      onImagePicked={action('onImagePicked')}
      onAvatarPicked={action('onAvatarPicked')}
      onCancel={action('onCancel')}
    />
  ));
