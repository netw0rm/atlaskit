import { storiesOf, action } from '@kadira/storybook';
import React, { PureComponent } from 'react';

import { name } from '../package.json';
import AkProfilecardResourced from '../src';
import { getMockProfileClient } from './util';

const mockClient = getMockProfileClient(10, 5000);

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
];

class AkProfilecardMultiProfiles extends PureComponent {
  state = {
    userId: '1',
    isVisible: true,
  };

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
        <br /><br />
        <button onClick={() => this.toggleVisibility()}>{
          this.state.isVisible ? 'Unmount' : 'Mount'
        }</button>
        &nbsp;
        <button onClick={() => this.reloadCardData('1')}>Set card data to profile</button>
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
