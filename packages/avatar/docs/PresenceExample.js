import React from 'react';
import { Presence } from '@atlaskit/avatar';
import { Block, Dot } from './helpers';

export default () => (
  <Block>
    <Dot><Presence presence="online" /></Dot>
    <Dot><Presence presence="busy" /></Dot>
    <Dot><Presence presence="offline" /></Dot>
  </Block>
);
