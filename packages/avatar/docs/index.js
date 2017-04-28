import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import AvatarExample from './AvatarExample';
import avatarExampleSrc from '!raw-loader!./AvatarExample';
import PresenceExample from './PresenceExample';
import presenceExampleSrc from '!raw-loader!./PresenceExample';

import avatarSrc from '!raw-loader!../src/components/Avatar';
import presenceSrc from '!raw-loader!../src/components/Presence';
/* eslint-enable import/no-duplicates, import/first */

export const componentSource = [
  { name: 'Avatar', src: avatarSrc },
  { name: 'Presence', src: presenceSrc },
];

const Usage = styled.pre`
  background-color: #F4F5F7;
  border-radius: 5px;
  margin: 14px 0;
  padding: 8px;
`;

export const description = (
  <div>
    <h3>Usage</h3>
    <p>
      This package exports an <code>Avatar</code> component and
      a <code>Presence</code> component:
    </p>
    <Usage>
      {"import Avatar, { Presence } from '@atlaskit/avatar';"}
    </Usage>
    <p>
      Use the <code>Avatar</code> component to represent users with their
      profile picture. Optionally, a presence to indicate online status can also
      be displayed.
    </p>
    <p>
      You can use the <code>Presence</code> component independently for contexts
      where the profile picture is not required (e.g. next to a username)
    </p>
  </div>
);

export const examples = [
  {
    title: 'Avatar',
    Component: AvatarExample,
    src: avatarExampleSrc,
  },
  {
    title: 'Presence',
    Component: PresenceExample,
    src: presenceExampleSrc,
  },
];
