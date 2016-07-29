import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkBadge from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';

const Badge = reactify(AkBadge, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('with a value', () => (
    <Badge id="myComponent" value="5" />
  ))
  .add('with a max value', () => (
    <Badge id="myComponent" value="500" max="99" />
  ))
  .add('with an inactive max value', () => (
    <Badge id="myComponent" value="50" max="99" />
  ))
  .add('with value === max value', () => (
    <Badge id="myComponent" value="99" max="99" />
  ));
