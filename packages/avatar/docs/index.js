import React from 'react';
import styled from 'styled-components';
import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';

/* eslint-disable import/no-duplicates, import/first */
import AvatarExample from './AvatarExample';
import avatarExampleSrc from '!raw-loader!./AvatarExample';
import AvatarGroupExample from './AvatarGroupExample';
import avatarGroupExampleSrc from '!raw-loader!./AvatarGroupExample';
import AvatarItemExample from './AvatarItemExample';
import avatarItemExampleSrc from '!raw-loader!./AvatarItemExample';
import PresenceExample from './PresenceExample';
import presenceExampleSrc from '!raw-loader!./PresenceExample';
import StatusExample from './StatusExample';
import statusExampleSrc from '!raw-loader!./StatusExample';
/* eslint-enable import/no-duplicates, import/first */

const Pre = styled.pre`
  background-color: ${themed({ light: colors.N20, dark: colors.DN50 })};
  border-radius: ${borderRadius}px;
  box-sizing: border-box;
  font-family: Monaco, Menlo, monospace;
  font-size: 0.9em;
  margin: ${math.multiply(gridSize, 2)}px 0;
  overflow-x: auto;
  padding: ${gridSize}px;
`;

export const description = (
  <div>
    <h3>Usage</h3>
    <p>
      This package exports an <code>Avatar</code> component and
      a <code>Presence</code> component:
    </p>
    <Pre>
      {"import Avatar, { AvatarGroup, AvatarItem, Presence, Status } from '@atlaskit/avatar';"}
    </Pre>
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
    title: 'AvatarGroup',
    Component: AvatarGroupExample,
    src: avatarGroupExampleSrc,
  },
  {
    title: 'AvatarItem',
    Component: AvatarItemExample,
    src: avatarItemExampleSrc,
  },
  {
    title: 'Presence',
    Component: PresenceExample,
    src: presenceExampleSrc,
  },
  {
    title: 'Status',
    Component: StatusExample,
    src: statusExampleSrc,
  },
];
