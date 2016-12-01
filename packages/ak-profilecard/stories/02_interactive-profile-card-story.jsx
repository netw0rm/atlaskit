import { storiesOf } from '@kadira/storybook';
import React from 'react';

import interActiveCard from './profile-interactive';
import { ProfileCard } from '../src/';

const Card = interActiveCard({ React, ProfileCard });

// have some more space around the profilecard
const canvasStyle = { padding: '30px' };

storiesOf('Profile Card Interactive', module)
  .add('card interactive playground', () => (
    <div style={canvasStyle}>
      <Card />
    </div>
  ));
