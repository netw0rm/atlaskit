import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { name } from '../package.json';
import { LayerManager } from '../src/';

const imports = [['React', 'react'], ['LayerManager', '@atlaskit/TEST']];

storiesOf(name, module)
  .addCodeExampleStory('Stateless LayerManager', () => (
    <LayerManager
      onLayerManager={action('onLayerManager')}
    />
  ), { imports });
