import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import BlanketDemo from './BlanketDemo';
import { name } from '../package.json';

function doSomethingOnClick() {
  action('the "onBlanketClicked" handler is fired')();
}

storiesOf(name, module)
  .add('transparent blanket', () => (
    <BlanketDemo
      helperText="Transparent blanket, try selecting this text."
      onBlanketClicked={doSomethingOnClick}
    />
  ))
  .add('tinted blanket', () => (
    <BlanketDemo
      helperText="Tinted blanket, try selecting this text."
      isTinted
      onBlanketClicked={doSomethingOnClick}
    />
  ));
