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
  .add('href: custom link', () => (
    <Component href="https://www.atlassian.com/search?query=jira" text="jira" />
  ));
