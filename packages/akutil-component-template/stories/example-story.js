import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import { definition } from '../src/index';
import { define } from 'skatejs';

const React = window.React;
const ReactDOM = window.ReactDOM;
const uniqueWebComponent = window.uniqueWebComponent;

const Component = reactify(uniqueWebComponent('akutil-component-template', definition, define), {
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
