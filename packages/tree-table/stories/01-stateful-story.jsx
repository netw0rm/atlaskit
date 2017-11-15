import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';
import AkTreeTable from '../src/';

storiesOf(name, module)
  .addCodeExampleStory('Stateful TreeTable', () => (
    <AkTreeTable label="My toggle" />
  ));
