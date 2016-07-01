import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import { definition } from '../src/index';
import { define } from 'skatejs';

const React = window.React;
const ReactDOM = window.ReactDOM;

const Component = reactify(window.uniqueWebComponent('editorkit-ui', definition, define), {
  React,
  ReactDOM,
});

storiesOf('editorkit-formatting-toolbar', module)
  .add('A default UI', () => (
    <Component />
  ));
