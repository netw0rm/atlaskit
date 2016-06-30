import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import ponyButtonWc from '../src/index';
import { define } from 'skatejs';

const React = window.React;
const ReactDOM = window.ReactDOM;

const PonyButton = reactify(window.uniqueWebComponent(ponyButtonWc, define), {
  React,
  ReactDOM,
});

storiesOf('ak-pony-button', module)
  .add('with name', () => (
    <PonyButton name="Randy">Hello world!</PonyButton>
  ))
  .add('with no name', () => (
    <PonyButton>Hello world!</PonyButton>
  ));
