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
      onSaveImage={action('onSaveImage')}
      onSaveAvatar={action('onSaveAvatar')}
      onCancel={action('onCancel')}
    />
  ))
  .add('Without imageSource', () => (
    <AvatarPickerDialog
      avatars={avatars}
      onSaveImage={action('onSaveImage')}
      onSaveAvatar={action('onSaveAvatar')}
      onCancel={action('onCancel')}
    />
  ));
