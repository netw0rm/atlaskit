import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('ak-wc-avatar', module)
  .add('with text', () => (
    <button onClick={action('clicked')}>My First Button</button>
  ))
  .add('with no text', () => (
    <button></button>
  ));
