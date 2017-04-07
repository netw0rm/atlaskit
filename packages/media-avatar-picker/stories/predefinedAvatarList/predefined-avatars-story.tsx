import {storiesOf} from '@kadira/storybook';
import * as React from 'react';

import AvatarList, {Avatar} from '../../src/avatarList';
import PredefinedAvatarList from '../../src/predefinedAvatarList';
import PredefinedAvatarView from '../../src/predefinedAvatarView/index';

function generateAvatarIds(start: number, count: number): Array<number> {
  const result: Array<number> = [];
  for (let i = 0; i < count; ++i) {
    result[i] = start + i;
  }
  return result;
}

function generateAvatars(count: number) {
  return generateAvatarIds(18831, count).map(id => ({
    dataURI: `https://jdog.jira-dev.com/secure/viewavatar?avatarId=${id}&avatarType=project`,
  }));
}

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
