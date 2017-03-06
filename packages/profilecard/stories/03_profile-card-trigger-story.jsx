import { storiesOf, action } from '@kadira/storybook';
import React, { PureComponent } from 'react';

import { name } from '../package.json';
import { AkProfilecardTrigger } from '../src';

const handleActionClick = title => action(`${title} button clicked`);

// have some more space around the profilecard
const canvasStyle = { padding: '30px' };

const triggerStyle = {
  display: 'block',
  width: '48px',
  height: '48px',
  borderRadius: '48px',
  background: '#f50',
  position: 'relative',
  top: '150px',
  left: '150px',
};

storiesOf(`${name} trigger`, module)
  .add('Span', () => (
    <div style={canvasStyle}>
      <AkProfilecardTrigger
        position="bottom left"
      >
        <span>Profilecard Trigger</span>
      </AkProfilecardTrigger>
    </div>
  ))
  .add('Avatar', () => (
    <div style={canvasStyle}>
      <AkProfilecardTrigger
        position="bottom left"
      >
        <span style={triggerStyle} />
      </AkProfilecardTrigger>
    </div>
  ));
