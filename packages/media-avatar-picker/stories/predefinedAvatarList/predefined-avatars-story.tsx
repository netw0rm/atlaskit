import {storiesOf} from '@kadira/storybook';
import * as React from 'react';

import {CardImageView} from '@atlaskit/media-card';

import AvatarList, {Avatar} from '../../src/avatarList';
import PredefinedAvatarList from '../../src/predefinedAvatarList';

const avatarIds = [18831, 18832, 18833, 18834, 18835];
const avatars: Array<Avatar> = avatarIds.map(id => ({
  dataURI: `https://jdog.jira-dev.com/secure/viewavatar?avatarId=${id}&avatarType=project`,
}));

storiesOf('Predefined Avatars', {})
  .add('Avatar List', () => (
    <AvatarList avatars={avatars.map(a => ({avatar: a, selected: false}))}/>
  ))
  .add('Predefined Avatars (none preselected)', () => {
    const onShowMore = () => {
      console.log('Show me more!');
    };

    const onAvatarSelected = (avatar: Avatar) => {
      console.log('Selected: ' + JSON.stringify(avatar));
    }

    return (<PredefinedAvatarList
      avatars={avatars}
      selectedAvatar={avatars[0]}
      onShowMore={onShowMore}
      onAvatarSelected={onAvatarSelected}
    />);
  })
  .add('Predefined Avatars (preselected)', () => {
    return (<PredefinedAvatarList
      avatars={avatars}
      selectedAvatar={avatars[2]}
    />);
  })
  .add('Card Experiment', () => (
    <CardImageView
      dataURI="https://jdog.jira-dev.com/secure/viewavatar?avatarId=18832&avatarType=project"
      mediaType="image"
      selectable
      selected
      dimensions={{height: 50, width: 50}}
    />
  ));
