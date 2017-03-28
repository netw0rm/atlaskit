import React, { PureComponent } from 'react';
import { action } from '@kadira/storybook';
import AkProfilecardResourced from '@atlaskit/profilecard';

import mockClient from '../story-data';

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

class AkProfilecardRandomById extends PureComponent {
  state = {
    userId: randomNumber(),
  };

  reloadRandomCardData = () => {
    this.setState({
      userId: newRandomUser(this.state.userId),
    });
  }

  reloadCardData = (id) => {
    this.setState({
      userId: id,
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
        <button onClick={this.reloadRandomCardData}>Load random card data</button>
        &nbsp;
        <button onClick={() => this.reloadCardData('1')}>Load card 1</button>
        &nbsp;
        <button onClick={() => this.reloadCardData('2')}>Load card 2</button>
        &nbsp;
        <button onClick={this.flushStoryCache}>Flush cache</button>
      </div>
    );
  }
}

export default (
  <AkProfilecardRandomById />
);
