import React from 'react';
import ReactDOM from 'react-dom';

import { storiesOf, action } from '@kadira/storybook';
import reactify from 'ak-util-react';
import avatarWc from '../src/index';

const Avatar = reactify(avatarWc, {
  React,
  ReactDOM,
});

storiesOf('ak-avatar', module)
  .add('a button', () => (
    <button onClick={action('clicked')}>My First Button</button>
  ))
  .add('An actual avatar', () => (
    <Avatar />
  ));
