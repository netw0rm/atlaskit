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
    <Component style={{ position: 'absolute', left: 100 }} />
  ))
  .add('a editorkit-dropdown at the bottom', () => (
    <Component style={{ position: 'absolute', left: 100, top: 600 }} />
  ))
  .add('1. buggy editorkit-dropdown at the bottom', () => (
    <div style={{ marginLeft: 100, marginTop:700 }}>
      <Component />
    </div>
  ))
  .add('2. buggy editorkit-dropdown at the bottom', () => (
    <Component style={{ position: 'absolute', left: 100, bottom: 10 }} />
  ));
