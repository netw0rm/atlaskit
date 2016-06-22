import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import avatarWc from '../src/index';
import { define } from 'skatejs';

const React = window.React;
const ReactDOM = window.ReactDOM;

const Avatar = reactify(window.uniqueWebComponent(avatarWc, define), {
  React,
  ReactDOM,
});

storiesOf('ak-avatar', module)
  .add('An actual avatar', () => (
    <Avatar src="//docs.atlassian.com/aui/latest/docs/images/avatar-96.png" />
  ));
