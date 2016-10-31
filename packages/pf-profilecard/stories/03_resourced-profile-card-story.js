import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import React from 'react';
import pfProfileCardResourced from '../src/wc/pf-profilecard-resourced';
import resourceProvider from './story-data';

const ProfileCardResourced = reactify(pfProfileCardResourced);

function randomNumber() {
  return Math.floor(Math.random() * 99);
}

const actions = [
  {
    event: 'ev_view',
    label: 'View',
  },
  {
    event: 'ev_chat',
    label: 'Chat',
  },
];

const handleActionClick = ev => action('Card action clicked')(JSON.stringify(ev.detail));

// have some more space around the profilecard
const canvasStyle = { margin: '30px' };

const ProfileCardRandomById = React.createClass({
  displayName: 'ProfileCardRandom',

  getInitialState() {
    return {
      userId: randomNumber(),
    };
  },

  _refreshCard() {
    this.setState({
      userId: randomNumber(),
    });
  },

  render() {
    return (
      <div style={canvasStyle}>
        <ProfileCardResourced
          data-user-id={this.state.userId}
          resourceProvider={resourceProvider}
          actions={actions}
          onSuccess={action('API request success')}
          onAction={handleActionClick}
        />
        <br /><br />
        <button onClick={this._refreshCard}>Load random card data</button>
      </div>
    );
  },
});

storiesOf('Profile Card Resourced', module)
  .add('mock api w/ random data', () => <ProfileCardRandomById />)
  .add('mock api w/o user-id', () => (
    <div style={canvasStyle}>
      <ProfileCardResourced />
    </div>
  ))
  .add('mock api w/ error response', () => (
    <div style={canvasStyle}>
      <ProfileCardResourced
        data-user-id={404}
        resourceProvider={resourceProvider}
        onError={ev => action('API request failed')(JSON.stringify(ev.detail))}
      />
    </div>
  ));
