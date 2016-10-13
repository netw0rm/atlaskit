/* eslint-disable */
import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import pfProfileCard from '../src/wc/pf-profilecard';
import pfProfileCardResourced from '../src/wc/pf-profilecard-resourced';

import { resourceProvider } from './story-data';

import React from 'react';

const ProfileCardResourced = reactify(pfProfileCardResourced);

function randomNumber() {
  return Math.floor(Math.random() * 99);
}

const actions = [
  {
    event: 'view',
    label: 'View',
  },
  {
    event: 'chat',
    label: 'Chat',
  },
];

const handleActionClick = (ev) => action('Card action clicked')(JSON.stringify(ev.detail));

const ProfileCardRandomById = React.createClass({
  displayName: 'ProfileCardRandom',

  getInitialState() {
    return {
      accountId: randomNumber(),
    };
  },

  _refreshCard() {
    this.setState({
      accountId: randomNumber()
    });
  },

  render() {
    return (
      <div style={canvasStyle}>
        <ProfileCardResourced
          data-account-id={this.state.accountId}
          resourceProvider={resourceProvider}
          actions={actions}
          onLoaded={action('API request success')}
          onAction={handleActionClick}
        />
        <br />
        <button onClick={this._refreshCard}>Load random card data</button>
      </div>
    );
  }
});

// have some more space around the profilecard
const canvasStyle = {margin: '30px'};

storiesOf('Profile Card Resourced', module)
  .add('mock api w/ random data', () => <ProfileCardRandomById />)
  .add('mock api w/o account/cloud id', () => (
    <div style={canvasStyle}>
      <ProfileCardResourced />
    </div>
  ))
  .add('mock api w/ 404 response', () => (
    <div style={canvasStyle}>
    <ProfileCardResourced
      data-account-id={404}
      resourceProvider={resourceProvider}
      onError={action('API request failed')}
    />
    </div>
  ));
