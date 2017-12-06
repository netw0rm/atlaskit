import { storiesOf, action } from '@kadira/storybook';
import { profilecard as profilecardUtils } from '@atlaskit/util-data-test';
import React, { PureComponent } from 'react';

import { name } from '../package.json';
import { AkProfilecard } from '../src/';
import interActiveCard from './profile-interactive';
import ProfileCardInDynamicTable from './examples/ProfileCardInDynamicTable';

const { profiles } = profilecardUtils;
const InteractiveCard = interActiveCard({ React, AkProfilecard });

const handleActionClick = title => action(`${title} button clicked`);

const fakeProfileData = {
  avatarUrl: profiles[4].User.avatarUrl,
  fullName: profiles[4].User.fullName,
  nickname: profiles[4].User.nickname,
  email: profiles[4].User.email,
  location: 'Sydney, Australia',
  timestring: '9:00am',
  meta: profiles[4].User.meta,
  presence: 'available',
  actions: [
    {
      label: 'View profile',
      id: 'view-profile',
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

class AkProfilecardHeightTransition extends PureComponent {
  constructor(data) {
    super();

    this.data = data;
    this.interval = null;

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        isLoading: !this.state.isLoading,
      });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <AkProfilecard
          isLoading={this.state.isLoading}
          {... this.data}
        />
      </div>
    );
  }
}

storiesOf(`${name}`, module)
  .add('loading state', () => (
    <div style={canvasStyle}>
      <AkProfilecard isLoading />
    </div>
  ))
  .add('error state default', () => (
    <div style={canvasStyle}>
      <AkProfilecard
        hasError
        clientFetchProfile={handleActionClick('Retry')}
      />
    </div>
  ))
  .add('error state without reload option', () => (
    <div style={canvasStyle}>
      <AkProfilecard hasError />
    </div>
  ))
  .add('error state "NotFound"', () => (
    <div style={canvasStyle}>
      <AkProfilecard
        hasError
        errorType={{
          reason: 'NotFound',
        }}
      />
    </div>
  ))
  .add('worst case card', () => {
    const data = fakeData({
      avatarUrl: null,
      presence: null,
      meta: null,
      timestring: null,
      location: null,
      presenceMessage: null,
    });

    return (
      <div style={canvasStyle}>
        <AkProfilecard {...data} />
      </div>
    );
  })
  .add('best case card', () => {
    const data = fakeData({
      presenceMessage: 'I love being productive',
    });

    return (
      <div style={canvasStyle}>
        <AkProfilecard {...data} />
      </div>
    );
  })
  .add('deactivated case card', () => {
    const data = fakeData({
      isActive: false,
    });

    return (
      <div style={canvasStyle}>
        <AkProfilecard {...data} />
      </div>
    );
  })
  .add('censored case card', () => {
    const data = fakeData({
      isCensored: true,
    });

    return (
      <div style={canvasStyle}>
        <AkProfilecard {...data} />
      </div>
    );
  })
  .add('is bot case card', () => {
    const data = fakeData({
      fullName: 'Awesome Thing Bot',
      nickname: 'awesomebot',
      isBot: true,
    });

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
        label: 'Foobar',
        id: 'action-foo',
        callback: handleActionClick('Foobar'),
      },
      {
        label: 'Barfoo',
        id: 'action-barfoo',
        callback: handleActionClick('Barfoo'),
      },
      {
        label: 'Foobar2',
        id: 'action-footwo',
        callback: handleActionClick('Foobar2'),
      },
    ];
    const data = fakeData({ actions });
    return (
      <div style={canvasStyle}>
        <AkProfilecard {...data} />
      </div>
    );
  })
  .add('height transition', () => {
    const data = fakeData({});

    return (
      <div style={canvasStyle}>
        <AkProfilecardHeightTransition {...data} />
      </div>
    );
  })
  .add('interactive playground', () => (
    <div style={canvasStyle}>
      <InteractiveCard />
    </div>
  ))
  .add('profile card in dynamic table', () => (
    <div style={canvasStyle}>
      <ProfileCardInDynamicTable />
    </div>
  ));
