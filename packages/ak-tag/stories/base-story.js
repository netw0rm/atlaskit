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
  .add('base: a simple ak-tag (should warn that no text was given in dev)', () => (
    <Component />
  ));
