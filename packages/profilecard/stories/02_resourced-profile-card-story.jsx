import { storiesOf, action } from '@kadira/storybook';
import React, { PureComponent } from 'react';

import { name } from '../package.json';
import AkProfilecardResourced from '../src';
import mockClient from './story-data';

function randomNumber() {
  return Math.floor(Math.random() * 10).toString();
}

const newRandomUser = (oldUserid) => {
  const rnd = randomNumber();

  if (rnd !== oldUserid) {
    return rnd;
  }

  return newRandomUser(oldUserid);
};

const handleActionClick = title => action(`${title} button clicked`);

const actions = [
  {
    label: 'View profile',
    callback: handleActionClick('View profile'),
  },
];

// have some more space around the profilecard
const canvasStyle = { padding: '30px' };

class AkProfilecardRandomById extends PureComponent {
  state = {
    userId: randomNumber(),
  };

  reloadCardData = () => {
    this.setState({
      userId: newRandomUser(this.state.userId),
    });
  }

  flushStoryCache = () => {
    mockClient.flushCache();
  }

  render() {
    return (
      <div>
        <AkProfilecardResourced
          actions={actions}
          cloudId="bogus-because-required"
          resourceClient={mockClient}
          userId={this.state.userId}
        />
        <br /><br />
        <button onClick={this.reloadCardData}>Load random card data</button>
        <button onClick={this.flushStoryCache}>Flush cache</button>
      </div>
    );
  }
}

storiesOf(`${name} resourced`, module)
  .add('mock api w/ random data', () => (
    <div style={canvasStyle}>
      <AkProfilecardRandomById />
    </div>
  ))
  .add('mock api w/o user-id', () => (
    <div style={canvasStyle}>
      <AkProfilecardResourced
        resourceClient={mockClient}
      />
    </div>
  ))
  .add('mock api w/ error response', () => (
    <div style={canvasStyle}>
      <AkProfilecardResourced
        cloudId="bogus-cloud-id"
        resourceClient={mockClient}
        userId="404"
      />
    </div>
  ));
