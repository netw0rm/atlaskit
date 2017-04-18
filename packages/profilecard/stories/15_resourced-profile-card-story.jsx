import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import AkProfilecardResourced from '../src';

import MockProfileClient from './story-data';

const mockClient = new MockProfileClient({
  cacheSize: 10,
  cacheMaxAge: 5000,
});

// have some more space around the profilecard
const canvasStyle = { padding: '30px' };

storiesOf(`${name}-resourced`, module)
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
