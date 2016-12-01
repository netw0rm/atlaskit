import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import { ProfileCard } from '../src/';
import interActiveCard from './profile-interactive';
import profiles from './profile-data';

const InteractiveCard = interActiveCard({ React, ProfileCard });

const handleActionClick = title => action(`${title} button clicked`);

const fakeProfileData = {
  avatarUrl: profiles[6].User.avatarUrl,
  fullName: profiles[6].User.fullName,
  nickname: profiles[6].User.nickname,
  email: profiles[6].User.email,
  location: 'Sydney, Australia',
  timestring: '9:00am',
  meta: profiles[6].User.meta,
  presence: 'available',
  actions: [
    {
      label: 'View',
      callback: handleActionClick('View'),
    },
    {
      label: 'Chat',
      callback: handleActionClick('Chat'),
    },
  ],
};

const fakeData = data => Object.assign(
  {},
  fakeProfileData,
  data || {},
);

// have some more space around the profilecard
const canvasStyle = { padding: '30px' };

storiesOf(`${name}`, module)
.add('worst case card', () => {
  const data = fakeData({
    avatarUrl: null,
  });

  return (
    <div style={canvasStyle}>
      <ProfileCard
        fullName={data.fullName}
        presence={data.presence}
        actions={data.actions}
      />
    </div>
  );
})
.add('w/ avatar img error', () => {
  const data = fakeData({ avatarUrl: 'http://localhost:404/no-avatar' });
  return (
    <div style={canvasStyle}>
      <ProfileCard {...data} />
    </div>
  );
})
.add('w/o presence', () => {
  const data = fakeData();
  delete data.presence;

  return (
    <div style={canvasStyle}>
      <ProfileCard {...data} />
    </div>
  );
})
.add('w/o actions', () => {
  const data = fakeData({ actions: null });
  return (
    <div style={canvasStyle}>
      <ProfileCard {...data} />
    </div>
  );
})
.add('custom actions', () => {
  const actions = [
    {
      label: 'Foo',
      callback: handleActionClick('Foo'),
    },
    {
      label: 'Bar',
      callback: handleActionClick('Bar'),
    },
  ];
  const data = fakeData({ actions });
  return (
    <div style={canvasStyle}>
      <ProfileCard {...data} />
    </div>
  );
})
.add('interactive playground', () => (
  <div style={canvasStyle}>
    <InteractiveCard />
  </div>
));
