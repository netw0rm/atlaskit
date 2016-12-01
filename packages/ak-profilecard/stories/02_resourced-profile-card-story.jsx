import { storiesOf, action } from '@kadira/storybook';
import React, { PureComponent } from 'react';

import { name } from '../package.json';
import { ProfileCardResourced } from '../src';
import mockClient from './story-data';

function randomNumber() {
  return Math.floor(Math.random() * 10).toString();
}

const handleActionClick = title => action(`${title} button clicked`);

const actions = [
  {
    label: 'View',
    callback: handleActionClick('View'),
  },
  {
    label: 'Chat',
    callback: handleActionClick('Chat'),
  },
];

// have some more space around the profilecard
const canvasStyle = { padding: '30px' };

class ProfileCardRandomById extends PureComponent {
  displayName: 'ProfileCardRandom'

  state = {
    userId: randomNumber(),
  };

  reloadCardData = () => {
    this.setState({
      userId: randomNumber(),
    });
  }

  render() {
    return (
      <div>
        <ProfileCardResourced
          userId={this.state.userId}
          cloudId="bogus-because-required"
          apiEndpoint="bogus-because-required"
          resourceClient={mockClient}
          actions={actions}
        />
        <br /><br />
        <button onClick={this.reloadCardData}>Load random card data</button>
      </div>
    );
  }
}

storiesOf(`${name} resourced`, module)
  .add('mock api w/ random data', () => (
    <div style={canvasStyle}>
      <ProfileCardRandomById />
    </div>
  ))
  .add('mock api w/o user-id', () => (
    <div style={canvasStyle}>
      <ProfileCardResourced
        resourceClient={mockClient}
      />
    </div>
  ))
  .add('mock api w/ error response', () => (
    <div style={canvasStyle}>
      <ProfileCardResourced
        userId="404"
        cloudId="bogus-cloud-id"
        resourceClient={mockClient}
      />
    </div>
  ));
