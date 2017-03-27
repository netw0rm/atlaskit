import { storiesOf, action } from '@kadira/storybook';
import React, { PureComponent } from 'react';

import { name } from '../package.json';
import { AkProfilecardTrigger } from '../src';

import mockClient from './story-data';

const handleActionClick = title => action(`${title} button clicked`);

// have some more space around the profilecard
const canvasStyle = { padding: '30px' };

const triggerStyle = {
  display: 'block',
  width: '48px',
  height: '48px',
  borderRadius: '48px',
  background: '#f50',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)',
};

storiesOf(`${name} trigger`, module)
  .add('Span', () => (
    <div style={canvasStyle}>
      <AkProfilecardTrigger
        userId="1"
        position="bottom left"
        resourceClient={mockClient}
      >
        <span>Profilecard Trigger</span>
      </AkProfilecardTrigger>
    </div>
  ))
  .add('Avatar tl', () => (
    <div style={canvasStyle}>
      <AkProfilecardTrigger
        userId="1"
        position="top left"
        resourceClient={mockClient}
      >
        <span style={triggerStyle} />
      </AkProfilecardTrigger>
    </div>
  ))
  .add('Avatar tr', () => (
    <div style={canvasStyle}>
      <AkProfilecardTrigger
        userId="1"
        position="top right"
        resourceClient={mockClient}
      >
        <span style={triggerStyle} />
      </AkProfilecardTrigger>
    </div>
  ))
  .add('Avatar rt', () => (
    <div style={canvasStyle}>
      <AkProfilecardTrigger
        userId="1"
        position="right top"
        resourceClient={mockClient}
      >
        <span style={triggerStyle} />
      </AkProfilecardTrigger>
    </div>
  ))
  .add('Avatar rb', () => (
    <div style={canvasStyle}>
      <AkProfilecardTrigger
        userId="1"
        position="right bottom"
        resourceClient={mockClient}
      >
        <span style={triggerStyle} />
      </AkProfilecardTrigger>
    </div>
  ))
  .add('Avatar br', () => (
    <div style={canvasStyle}>
      <AkProfilecardTrigger
        userId="1"
        position="bottom right"
        resourceClient={mockClient}
      >
        <span style={triggerStyle} />
      </AkProfilecardTrigger>
    </div>
  ))
  .add('Avatar bl', () => (
    <div style={canvasStyle}>
      <AkProfilecardTrigger
        userId="1"
        position="bottom left"
        resourceClient={mockClient}
      >
        <span style={triggerStyle} />
      </AkProfilecardTrigger>
    </div>
  ))
  .add('Avatar lb', () => (
    <div style={canvasStyle}>
      <AkProfilecardTrigger
        userId="1"
        position="left bottom"
        resourceClient={mockClient}
      >
        <span style={triggerStyle} />
      </AkProfilecardTrigger>
    </div>
  ))
  .add('Avatar lt', () => (
    <div style={canvasStyle}>
      <AkProfilecardTrigger
        userId="1"
        position="left top"
        resourceClient={mockClient}
      >
        <span style={triggerStyle} />
      </AkProfilecardTrigger>
    </div>
  ));
