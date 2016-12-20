import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Banner from '../src';
import { name } from '../package.json';

storiesOf(name, module)
  .add('a warning banner', () => (
    <Banner isOpen />
  ))
  .add('an error banner', () => (
    <Banner
      isOpen
      appearance="error"
    />
  ));
