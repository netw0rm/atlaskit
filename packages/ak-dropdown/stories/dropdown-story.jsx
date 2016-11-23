import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Dropdown from '../src';
import { name } from '../package.json';

storiesOf(`${name} component`, module)
  .add('simple dropdown', () => (
    <Dropdown />
  ));
