import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Badge from '../src';
import { name } from '../package.json';
import OnValueUpdatedDemo from './on-value-updated-demo';

const imports = [['React', 'react'], ['Badge', 'ak-badge']];
storiesOf(name, module)
  .addCodeExampleStory('with a value', () => (
    <div>
      <Badge value="5" />
      <Badge appearance="primary" value={-5} />
      <Badge appearance="important" value="25" />
      <Badge appearance="added" value="3000" max="99" />
      <Badge appearance="removed" />
    </div>
  ), { imports })
  .addCodeExampleStory('with no value', () => (
    <Badge />
  ), { imports })
  .addCodeExampleStory('with a negative value', () => (
    <Badge value={-5} />
  ), { imports })
  .addCodeExampleStory('with a max value', () => (
    <Badge value="500" max="99" />
  ), { imports })
  .addCodeExampleStory('with value <= max value', () => (
    <Badge value="50" max="99" />
  ), { imports })
  .addCodeExampleStory('with value === max value', () => (
    <Badge value="99" max="99" />
  ), { imports })
  .add('onValueUpdated handler prop', () => (
    <OnValueUpdatedDemo />
  ));
