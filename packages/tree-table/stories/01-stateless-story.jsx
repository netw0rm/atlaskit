import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { name } from '../package.json';
import { TreeTable } from '../src/';

const imports = [['React', 'react'], ['TreeTable', '@atlaskit/TEST']];

storiesOf(name, module)
  .addCodeExampleStory('Stateless TreeTable', () => (
    <TreeTable
      onTreeTable={action('onTreeTable')}
    />
  ), { imports });
