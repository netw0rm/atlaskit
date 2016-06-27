import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import component from '../src/index';
import { define } from 'skatejs';

const React = window.React;
const ReactDOM = window.ReactDOM;

const Component = reactify(window.uniqueWebComponent(component, define), {
  React,
  ReactDOM,
});

storiesOf('akutil-component-template', module)
  .add('an akutil-component-template', () => (
    <Component />
  ))
  .add('another story', () => (
    <Component id="myComponent" />
  ));
