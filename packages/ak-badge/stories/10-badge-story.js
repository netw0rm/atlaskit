import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Badge from '../src';
import { name } from '../package.json';

const imports = [['React', 'react'], ['Badge', 'ak-badge']];
storiesOf(name, module)
  .addCodeExampleStory('with a value', () => (
    <div>
      <Badge value="5" />
      <Badge appearance="primary" value={-5} />
      <Badge appearance="important" value="25" />
      <Badge appearance="added" max="99" value="3000" />
      <Badge appearance="removed" />
      <Badge appearance="default" theme="dark" />
    </div>
  ), { imports })
  .addCodeExampleStory('with no value', () => (
    <Badge />
  ), { imports })
  .addCodeExampleStory('with a negative value', () => (
    <Badge value={-5} />
  ), { imports })
  .addCodeExampleStory('with a max value', () => (
    <Badge max="99" value="500" />
  ), { imports })
  .addCodeExampleStory('with value <= max value', () => (
    <Badge max="99" value="50" />
  ), { imports })
  .addCodeExampleStory('with value === max value', () => (
    <Badge max="99" value="99" />
  ), { imports });
