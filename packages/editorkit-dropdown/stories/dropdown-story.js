import { storiesOf, action } from '@kadira/storybook';
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
  .add('a simple editorkit-dropdown', () => (
    <Component />
  ))
  // .add('a div', () => <div />)
  .add('a editorkit-dropdown at the bottom', () => (
    <Component style="position: absolute; bottom: 0px" />
  ));
