import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { name } from '../package.json';
import DotsExample from './examples/dots';

storiesOf(name, module)
  .add('Dots', () => (
    <DotsExample />
  ));
