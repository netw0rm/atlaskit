import React from 'react';
import { storiesOf } from '@kadira/storybook';

storiesOf('ak-pony-button', module)
  .add('with name', () => (
    <ak-pony-button name="Randy"></ak-pony-button>
  ))
  .add('with no name', () => (
    <ak-pony-button></ak-pony-button>
  ));
