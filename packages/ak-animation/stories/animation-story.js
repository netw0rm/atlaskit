import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import { definition } from '../src/index';
import { define } from 'skatejs';

const React = window.React;
const ReactDOM = window.ReactDOM;
const uniqueWebComponent = window.uniqueWebComponent;

const Component = reactify(uniqueWebComponent('x-hello', definition, define), {
  React,
  ReactDOM,
});

export default storiesOf('akutil-component-template', module)
  .add('a simple akutil-component-template', () => (
    <Component name="Blah"><span>Hello, Blah!!</span></Component>
  ));
