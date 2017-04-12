import {storiesOf} from '@kadira/storybook';
import * as React from 'react';

import {Avatar} from '../../src/avatarList';
import AvatarPickerDialog from '../../src/avatarPickerDialog';
import {generateAvatars} from '../utils';

const avatars: Array<Avatar> = generateAvatars(30);

storiesOf('Avatar Picker', {})
  .add('Demo', () => (
    <AvatarPickerDialog avatars={avatars} />
  ));
