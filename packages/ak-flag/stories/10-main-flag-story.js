import { storiesOf } from '@kadira/storybook';
import React from 'react';

import AnimationDemo from './components/AnimationDemo';
import { name } from '../package.json';
import Flag from '../src';
import GreenSuccessIcon from './components/GreenSuccessIcon';

storiesOf(name, module)
  .add('Interactive flag example', () => (
    <AnimationDemo />
  ))
  .add('Flag dumb component without FlagGroup', () => (
    <Flag
      id="1"
      key="1"
      icon={<GreenSuccessIcon />}
      title="Welcome to the jungle"
      description="We got fun an games. We got everything you want honey, we know the names."
    />
  ));
