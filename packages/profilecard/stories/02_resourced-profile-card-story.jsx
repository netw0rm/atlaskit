import { storiesOf, action } from '@kadira/storybook';
import React, { PureComponent } from 'react';

import { name } from '../package.json';
import AkProfileCardResourced from '../src';
import mockClient from './story-data';

function randomNumber() {
  return Math.floor(Math.random() * 10).toString();
}

const handleActionClick = title => action(`${title} button clicked`);

const actions = [
  {
    label: 'View profile',
    callback: handleActionClick('View profile'),
  },
];

// have some more space around the profilecard
const canvasStyle = { padding: '30px' };

class AkProfileCardRandomById extends PureComponent {
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
        <AkProfileCardResourced
          actions={actions}
          cloudId="bogus-because-required"
          resourceClient={mockClient}
          userId={this.state.userId}
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
      <AkProfileCardRandomById />
    </div>
  ))
  .add('mock api w/o user-id', () => (
    <div style={canvasStyle}>
      <AkProfileCardResourced
        resourceClient={mockClient}
      />
    </div>
  ))
  .add('mock api w/ error response', () => (
    <div style={canvasStyle}>
      <AkProfileCardResourced
        cloudId="bogus-cloud-id"
        resourceClient={mockClient}
        userId="404"
      />
    </div>
  ));
