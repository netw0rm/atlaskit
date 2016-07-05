import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import { definition, name } from '../src/index';
import { define, vdom } from 'skatejs'; // eslint-disable-line no-unused-vars
const { React, ReactDOM, uniqueWebComponent } = window;

const Component = reactify(uniqueWebComponent(name, definition, define), {
  React,
  ReactDOM,
});

storiesOf('editorkit-formatting-toolbar', module)
  .add('A default UI', () => (
    <Component />
  ));
