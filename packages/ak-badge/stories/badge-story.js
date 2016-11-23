import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Badge from '../src';
import { name } from '../package.json';
import OnValueUpdatedDemo from './on-value-updated-demo';

storiesOf(name, module)
  .add('with a value', () => (
    <div>
      <Badge value="5" />
      <Badge appearance="primary" value={-5} />
      <Badge appearance="important" value="25" />
      <Badge appearance="added" value="3000" max="99" />
      <Badge appearance="removed" />
    </div>
  ))
  .add('with no value', () => (
    <Badge />
  ))
  .add('with a negative value', () => (
    <Badge value={-5} />
  ))
  .add('with a max value', () => (
    <Badge value="500" max="99" />
  ))
  .add('with value <= max value', () => (
    <Badge value="50" max="99" />
  ))
  .add('with value === max value', () => (
    <Badge value="99" max="99" />
  ))
  .add('onValueUpdated handler prop', () => (
    <OnValueUpdatedDemo />
  ));
