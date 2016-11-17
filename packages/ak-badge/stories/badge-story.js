import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Badge from '../src';
import { name } from '../package.json';

storiesOf(name, module)
  .add('with a value', () => (
    <div>
      <Badge id="myComponent" value="5" />
      <Badge id="myComponent" appearance="primary" value="-5" />
      <Badge id="myComponent" appearance="important" value="25" />
      <Badge id="myComponent" appearance="added" value="3000" max="99" />
      <Badge id="myComponent" appearance="removed" />
    </div>
  ))
  .add('with no value', () => (
    <Badge id="myComponent" />
  ))
  .add('with a negative value', () => (
    <Badge id="myComponent" value={-5} />
  ))
  .add('with a max value', () => (
    <Badge id="myComponent" value="500" max="99" />
  ))
  .add('with value <= max value', () => (
    <Badge id="myComponent" value="50" max="99" />
  ))
  .add('with value === max value', () => (
    <Badge id="myComponent" value="99" max="99" />
  ));
