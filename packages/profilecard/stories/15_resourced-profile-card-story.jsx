import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import AkProfilecardResourced from '../src';
import mockClient from './story-data';

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
