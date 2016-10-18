import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';

import pfProfileCard from '../src/wc/pf-profilecard';
import profiles from './profile-data';


const ProfileCard = reactify(pfProfileCard);

const fakeProfileData = {
  avatarUrl: profiles[6].avatarUrl,
  fullname: profiles[6].fullname,
  nickname: profiles[6].nickname,
  email: profiles[6].email,
  location: 'Sydney, Australia',
  timestamp: 0, // is set to current time in #fakeData()
  meta: profiles[6].role,
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
  {
    timestamp: Math.floor(new Date().getTime() / 1000),
  },
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
.add('w/ 24h display', () => {
  const data = fakeData({ use24h: true });
  return (
    <div style={canvasStyle}>
      <ProfileCard
        {...data}
        onAction={handleActionClick}
      />
    </div>
  );
})
.add('w/ weekday display', () => {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const ts = Math.floor(now.getTime() / 1000);
  const data = fakeData({ timestamp: ts });
  return (
    <div style={canvasStyle}>
      <ProfileCard
        {...data}
        onAction={handleActionClick}
      />
    </div>
  );
})
.add('w/ weekday & 24h display', () => {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const ts = Math.floor(now.getTime() / 1000);
  const data = fakeData({ timestamp: ts, use24h: true });
  return (
    <div style={canvasStyle}>
      <ProfileCard
        {...data}
        onAction={handleActionClick}
      />
    </div>
  );
})
.add('w/o presence', () => {
  const data = fakeData({ presence: null });
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
.add('custom actions', () => {
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
