import {storiesOf} from '@kadira/storybook';
import * as React from 'react';

import {CardImageView} from '@atlaskit/media-card';

import AvatarList from '../../src/avatarList';
import PredefinedAvatarList from '../../src/predefinedAvatarList';

const avatarIds = [18831, 18832, 18833, 18834, 18835];
const avatars = avatarIds.map(id => ({
  dataURI: `https://jdog.jira-dev.com/secure/viewavatar?avatarId=${id}&avatarType=project`,
  selected: id === 18831 || id === 18833
}));

storiesOf('Predefined Avatars', {})
  .add('Avatar List', () => (
    <AvatarList avatars={avatars}/>
  ))
  .add('Predefined Avatars', () => (
    <PredefinedAvatarList avatars={avatars}/>
  ))
  .add('Card Experiment', () => (
    <CardImageView
      dataURI="https://jdog.jira-dev.com/secure/viewavatar?avatarId=18832&avatarType=project"
      mediaType="image"
      selectable
      selected
      dimensions={{height: 50, width: 50}}
    />
  ));
