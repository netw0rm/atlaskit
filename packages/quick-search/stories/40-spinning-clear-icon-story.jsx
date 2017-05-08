import React from 'react';

import { storiesOf } from '@kadira/storybook';

import SpinningClearIcon from '../src/components/SpinningClearIcon';
import { name } from '../package.json';

storiesOf(`${name}SpinningClearIcon`, module)
  .add('Default state', () => (
    <SpinningClearIcon />
  ))
  .add('shouldSpin = true', () => (
    <SpinningClearIcon shouldSpin />
  ));
