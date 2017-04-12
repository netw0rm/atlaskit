import {storiesOf} from '@kadira/storybook';
import * as React from 'react';

import AvatarList, {Avatar} from '../../src/avatarList';
import PredefinedAvatarList from '../../src/predefinedAvatarList';
import PredefinedAvatarView from '../../src/predefinedAvatarView/index';
import {generateAvatars} from '../utils';

const avatars: Array<Avatar> = generateAvatars(5);

storiesOf('Predefined Avatars', {})
  .add('Avatar List', () => (
    <AvatarList avatars={avatars.map(a => ({avatar: a, selected: false}))}/>
  ))
  .add('Predefined Avatars (none preselected)', () => {
    return (<PredefinedAvatarList
      avatars={avatars}
    />);
  })
  .add('Predefined Avatars (preselected)', () => {
    return (<PredefinedAvatarList
      avatars={avatars}
      selectedAvatar={avatars[2]}
    />);
  })
  .add('Predefined Avatar View', () => {
    return (
      <PredefinedAvatarView
        avatars={generateAvatars(25)}
      />
    );
  });
