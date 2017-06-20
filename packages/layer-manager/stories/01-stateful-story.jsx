import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';
import AkLayerManager from '../src/';

storiesOf(name, module)
  .addCodeExampleStory('Stateful LayerManager', () => (
    <AkLayerManager label="My toggle" />
  ));
