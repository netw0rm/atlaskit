import { storiesOf, action } from '@kadira/storybook';
import React, { PureComponent } from 'react';

import { name } from '../package.json';
import AkProfilecardResourced from '../src';
import { getMockProfileClient } from './util';

const mockClient = getMockProfileClient(10, 10000);

// have some more space around the profilecard
const canvasStyle = { padding: '30px' };

const handleActionClick = title => action(`${title} button clicked`);
const analytics = (key, props) => {
  const propsString = Object.keys(props).map(item =>
    `${item}: ${props[item]}`
  ).join('; ');

  action(`analytics: ${key} { ${propsString} }`)();
};

const actions = [
  {
    label: 'View profile',
    id: 'view-profile',
    callback: handleActionClick('View profile'),
  },
  {
    label: 'Chat with',
    id: 'hidden-button',
    callback: handleActionClick('Chat with'),
    shouldRender: (profile) => profile.presence === 'available',
  },
];

class AkProfilecardMultiProfiles extends PureComponent {
  state = {
    userId: '1',
    isVisible: true,
  };

  getNextUserId = () => {
    const currentId = parseInt(this.state.userId, 10);
    const nextId = currentId > 3 ? 1 : currentId + 1;
    return String(nextId);
  }

  getPreviousUserId = () => {
    const currentId = parseInt(this.state.userId, 10);
    const nextId = currentId > 1 ? currentId - 1 : 4;
    return String(nextId);
  }

  reloadCardData = (id) => {
    this.setState({
      userId: id,
    });
  }

  toggleVisibility() {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

  flushStoryCache = () => {
    mockClient.flushCache();
  }

  render() {
    return (
      <div>
        {
          this.state.isVisible ? <AkProfilecardResourced
            actions={actions}
            cloudId="DUMMY-CLOUDID"
            resourceClient={mockClient}
            userId={this.state.userId}
            analytics={analytics}
          /> : null
        }
        <br />
        Card #{this.state.userId}
        <br />
        <p>
          Second action is set to only appear when presence equals available.
          <br />
          See card number 3.
        </p>
        <br />
        <button onClick={() => this.toggleVisibility()}>{
          this.state.isVisible ? 'Unmount' : 'Mount'
        }</button>
        &nbsp;
        <button
          onClick={() => this.reloadCardData(this.getPreviousUserId())}
        >Previous profile</button>
        &nbsp;
        <button
          onClick={() => this.reloadCardData(this.getNextUserId())}
        >Next profile</button>
        &nbsp;
        <button onClick={() => this.reloadCardData('error:default')}>Set card data to error</button>
        &nbsp;
        <button onClick={this.flushStoryCache}>Delete cache</button>
      </div>
    );
  }
}

storiesOf(`${name}-resourced`, module)
  .add('mock data', () => (
    <div style={canvasStyle}>
      <AkProfilecardMultiProfiles />
    </div>
  ))
  .add('mock api /w user not found', () => (
    <div style={canvasStyle}>
      <AkProfilecardResourced
        cloudId="bogus-cloud-id"
        userId="error:NotFound"
        resourceClient={mockClient}
      />
    </div>
  ))
  .add('mock api /w generic error', () => (
    <div style={canvasStyle}>
      <AkProfilecardResourced
        cloudId="bogus-cloud-id"
        userId="error:default"
        resourceClient={mockClient}
      />
    </div>
  ))
  .add('mock api w/o user-id', () => (
    <div style={canvasStyle}>
      <AkProfilecardResourced
        resourceClient={mockClient}
      />
    </div>
  ))
  .add('mock api w/o cloud-id', () => (
    <div style={canvasStyle}>
      <AkProfilecardResourced
        userId={3}
        resourceClient={mockClient}
      />
    </div>
  ));
