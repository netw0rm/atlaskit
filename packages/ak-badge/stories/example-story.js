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
  ));
