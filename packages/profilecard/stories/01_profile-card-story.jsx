import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import styles from 'style!../src/styles/profilecard-resourced.less';

import LoadingMessage from '../src/components/LoadingMessage';
import ErrorMessage from '../src/components/ErrorMessage';

import { name } from '../package.json';
import { AkProfilecard } from '../src/';
import interActiveCard from './profile-interactive';
import profiles from './profile-data';

const InteractiveCard = interActiveCard({ React, AkProfilecard });

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
      label: 'View profile',
      callback: handleActionClick('View profile'),
    },
  ],
};

const fakeData = data => ({
  ...fakeProfileData,
  ...data,
});

// have some more space around the profilecard
const canvasStyle = { padding: '30px' };

storiesOf(`${name}`, module)
  .add('loading state', () => (
    <div style={canvasStyle}>
      <div className={styles.profilecardResourced}>
        <LoadingMessage />
      </div>
    </div>
  ))
  .add('error state', () => (
    <div style={canvasStyle}>
      <div className={styles.profilecardResourced}>
        <ErrorMessage
          reload={handleActionClick('Retry')}
        />
      </div>
    </div>
  ))
  .add('error state without reload option', () => (
    <div style={canvasStyle}>
      <div className={styles.profilecardResourced}>
        <ErrorMessage />
      </div>
    </div>
  ))
  .add('worst case card', () => {
    const data = fakeData({
      avatarUrl: null,
      presence: null,
    });

    return (
      <div style={canvasStyle}>
        <AkProfilecard
          actions={data.actions}
          fullName={data.fullName}
        />
      </div>
    );
  })
  .add('best case card', () => {
    const data = fakeData({});

    return (
      <div style={canvasStyle}>
        <AkProfilecard {...data} />
      </div>
    );
  })
  .add('w/ avatar img error', () => {
    const data = fakeData({ avatarUrl: 'http://localhost:404/no-avatar' });
    return (
      <div style={canvasStyle}>
        <AkProfilecard {...data} />
      </div>
    );
  })
  .add('alternate actions', () => {
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
        <AkProfilecard {...data} />
      </div>
    );
  })
  .add('interactive playground', () => (
    <div style={canvasStyle}>
      <InteractiveCard />
    </div>
  ));
