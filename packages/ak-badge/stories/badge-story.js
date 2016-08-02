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
    <div>
      <p><Badge id="myComponent" value="5" /> default</p>
      <p><Badge id="myComponent" appearance="primary" value="5" /> primary</p>
      <p><Badge id="myComponent" appearance="important" value="5" /> important</p>
      <p><Badge id="myComponent" appearance="added" value="5" /> added</p>
      <p><Badge id="myComponent" appearance="removed" value="5" /> removed</p>
    </div>
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
