import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import definition from '../src/index';
import { define } from 'skatejs';
const { React, ReactDOM, uniqueWebComponent } = window;
import { name } from '../package.json';

const Component = reactify(uniqueWebComponent(name, definition, define), {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('with a value', () => (
    <Component id="myComponent" value="5" />
  ))
  .add('with a max value', () => (
    <Component id="myComponent" value="500" max="99" />
  ))
  .add('with an inactive max value', () => (
    <Component id="myComponent" value="50" max="99" />
  ))
  .add('with value === max value', () => (
    <Component id="myComponent" value="99" max="99" />
  ));
