import React from 'react';
import { AkProfilecard } from '@atlaskit/profilecard';

import avatar from 'file!../data/1.jpg';

export default (
  <AkProfilecard
    avatarUrl={avatar}
    fullName="Lewis Cervantes"
    nickname="lcervantes"
    location="Sydney, Australia"
    timestring="9:00am"
    meta="Senior Developer"
    presence="available"
    actions={[
      {
        label: 'View profile',
        callback: () => {},
      },
    ]}
  />
);
