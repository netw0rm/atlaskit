import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Tabs from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';

const Component = reactify(Tabs, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('simple ak-tabs', () => (
    <Component>
      <ak-tab label="Tab 1">Tab 1 content</ak-tab>
      <ak-tab selected label="Tab 2">Tab 2 content</ak-tab>
      <ak-tab label="Tab 3">Tab 3 content</ak-tab>
    </Component>
  ))
  .add('ak-tabs with many items', () => (
    <Component>
      <ak-tab label="Long tab name 1">Tab 1 content</ak-tab>
      <ak-tab selected label="Long tab name 2">Tab 2 content</ak-tab>
      <ak-tab label="Long tab name 3">Tab 3 content</ak-tab>
      <ak-tab label="Another tab">Tab content</ak-tab>
      <ak-tab label="Another tab">Tab content</ak-tab>
      <ak-tab label="Another tab">Tab content</ak-tab>
      <ak-tab label="Another tab">Tab content</ak-tab>
      <ak-tab label="Another tab">Tab content</ak-tab>
      <ak-tab label="Another tab">Tab content</ak-tab>
      <ak-tab label="Another tab">Tab content</ak-tab>
      <ak-tab label="Another tab">Tab content</ak-tab>
      <ak-tab label="Another tab">Tab content</ak-tab>
      <ak-tab label="Another tab">Tab content</ak-tab>
      <ak-tab label="Another tab">Tab content</ak-tab>
      <ak-tab label="Another tab">Tab content</ak-tab>
      <ak-tab label="Another tab">Tab content</ak-tab>
    </Component>
  ));
