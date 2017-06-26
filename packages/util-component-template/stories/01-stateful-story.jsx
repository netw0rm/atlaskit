import React from 'react';
import { storiesOf } from '@storybook/react';
import { name } from '../package.json';
import AkToggle from '../src/';

storiesOf(name, module)
  .addCodeExampleStory('Stateful Toggle', () => (
    <AkToggle label="My toggle" />
  ));
