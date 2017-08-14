import React from 'react';
import { Status } from '@atlaskit/avatar';
import { Block, Dot } from './helpers';

export default () => (
  <Block>
    <Dot><Status status="approved" /></Dot>
    <Dot><Status status="declined" /></Dot>
    <Dot><Status status="locked" /></Dot>
  </Block>
);
