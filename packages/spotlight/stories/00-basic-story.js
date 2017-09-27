import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { name } from '../package.json';
import BasicExample from './examples/basic';

storiesOf(name, module)
  .add('Basic Usage', () => <BasicExample />);
