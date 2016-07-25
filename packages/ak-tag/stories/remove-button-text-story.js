import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Tag from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';

const Component = reactify(Tag, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('remove-button: simple', () => (
    <Component text="some tag" remove-button-text="Remove me" />
  ))
  .add('remove-button: with href', () => (
    <Component href="http://www.atlassian.com" text="atlassian" remove-button-text="Remove me" />
  ));
