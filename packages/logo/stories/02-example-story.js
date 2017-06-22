import { storiesOf } from '@storybook/react';
import React from 'react';

import InteractiveLogo from './components/interactive-logo';
import { name } from '../package.json';

storiesOf(name, module)
    .add('Interactive example', () => (
      <InteractiveLogo />
    ));
