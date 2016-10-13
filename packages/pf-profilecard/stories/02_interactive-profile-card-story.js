/* eslint-disable */
import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';
import interActiveCard from './profile-interactive';
import pfProfileCard from '../src/wc/pf-profilecard';

const ProfileCard = reactify(pfProfileCard);

const Card = interActiveCard({React, ProfileCard});

// have some more space around the profilecard
const canvasStyle = {margin: '30px'};

storiesOf('Profile Card Interactive', module)
  .add('card interactive playground', () => {
    return (
      <div style={canvasStyle}>
        <Card />
      </div>
    );
  })
