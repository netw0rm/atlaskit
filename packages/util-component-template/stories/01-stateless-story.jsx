import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { name } from '../package.json';
import { Toggle } from '../src/';

const imports = [['React', 'react'], ['Toggle', '@atlaskit/TEST']];

storiesOf(name, module)
  .addCodeExampleStory('Stateless Toggle', () => (
    <Toggle
      onToggle={action('onToggle')}
    />
  ), { imports });
