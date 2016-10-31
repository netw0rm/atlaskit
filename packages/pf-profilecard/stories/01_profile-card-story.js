import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';

import pfProfileCard from '../src/wc/pf-profilecard';
import profiles from './profile-data';

const ProfileCard = reactify(pfProfileCard);

const fakeProfileData = {
  avatarUrl: profiles[6].avatarUrl,
  fullname: profiles[6].fullName,
  nickname: profiles[6].nickName,
  email: profiles[6].email,
  location: 'Sydney, Australia',
  timestring: '9:00am',
  meta: profiles[6].meta,
  presence: 'online',
  actions: [
    {
      label: 'View',
      event: 'view',
    },
    {
      label: 'Chat',
      event: 'chat',
    },
  ],
};

const fakeData = data => Object.assign(
  {},
  fakeProfileData,
  data || {}
);

// have some more space around the profilecard
const canvasStyle = { margin: '30px' };

const handleActionClick = ev => action('Card action clicked')(JSON.stringify(ev.detail));

storiesOf('Profile Card', module)
.add('worst case card', () => {
  const data = fakeData({ avatarUrl: null });
  return (
    <div style={canvasStyle}>
      <ProfileCard
        fullname={data.fullname}
        email={data.email}
        presence={data.presence}
        actions={data.actions}
        onAction={handleActionClick}
      />
    </div>
  );
})
.add('w/ avatar img error', () => {
  const data = fakeData({ avatarUrl: 'http://localhost:404/no-avatar' });
  return (
    <div style={canvasStyle}>
      <ProfileCard
        avatarUrl={data.avatarUrl}
        fullname={data.fullname}
        email={data.email}
        presence={data.presence}
        actions={data.actions}
        onAction={handleActionClick}
      />
    </div>
  );
})
.add('w/ all details', () => {
  const data = fakeData();
  return (
    <div style={canvasStyle}>
      <ProfileCard
        {...data}
        onAction={handleActionClick}
      />
    </div>
  );
})
.add('w/o actions', () => {
  const data = fakeData({ actions: null });
  return (
    <div style={canvasStyle}>
      <ProfileCard
        {...data}
        onAction={handleActionClick}
      />
    </div>
  );
})
.add('w/ custom actions', () => {
  const actions = [
    { label: 'Foo', event: 'foo_action' },
    { label: 'Bar', event: 'bar_action' },
  ];
  const data = fakeData({ actions });
  return (
    <div style={canvasStyle}>
      <ProfileCard
        {...data}
        onAction={handleActionClick}
      />
    </div>
  );
});
