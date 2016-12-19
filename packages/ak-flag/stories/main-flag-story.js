import { storiesOf } from '@kadira/storybook';
import React from 'react';

import AnimationDemo from './components/AnimationDemo';
import { name } from '../package.json';

storiesOf(name, module)
  .add('ak-flag interactive example', () => (
    <AnimationDemo />
  ));
