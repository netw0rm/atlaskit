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
      <ak-tab label="Details">Details content</ak-tab>
      <ak-tab label="Diff">Diff content</ak-tab>
      <ak-tab label="Commits">Commits content</ak-tab>
      <ak-tab label="Pipeline">Pipeline content</ak-tab>
    </Component>
  ))
  .add('ak-tabs with many items', () => (
    <Component>
      <ak-tab label="Long tab name 1">Tab 1 content</ak-tab>
      <ak-tab selected label="Initially selected tab 2">Tab 2 content</ak-tab>
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
  ))
  .add('simple ak-tabs inside a container', () => (
    <div style={{ width: '200px', border: '1px solid black' }}>
      <Component>
        <ak-tab selected label="Details">Details content</ak-tab>
        <ak-tab label="Diff">Diff content</ak-tab>
        <ak-tab label="Commits">Commits content</ak-tab>
        <ak-tab label="Pipeline">Pipeline content</ak-tab>
      </Component>
    </div>
  ))
  .add('ak-tabs inside a container with last tab selected', () => (
    <div style={{ width: '200px', border: '1px solid black' }}>
      <Component>
        <ak-tab label="Details">Details content</ak-tab>
        <ak-tab label="Diff">Diff content</ak-tab>
        <ak-tab label="Commits">Commits content</ak-tab>
        <ak-tab selected label="Pipeline">Pipeline content</ak-tab>
      </Component>
    </div>
  ))
  .add('ak-tabs with many items inside a container', () => (
    <div style={{ width: '200px', border: '1px solid black' }}>
      <Component>
        <ak-tab label="Long tab name 1">Tab 1 content</ak-tab>
        <ak-tab selected label="Long tab name 2">Tab 2 content</ak-tab>
        <ak-tab label="Long tab name 3">Tab 3 content</ak-tab>
        <ak-tab label="Another tab">Tab content</ak-tab>
        <ak-tab label="Another tab">Tab content</ak-tab>
        <ak-tab label="Another tab">Tab content</ak-tab>
        <ak-tab label="Another tab">Tab content</ak-tab>
      </Component>
    </div>
  ))
  .add('ak-tabs with no children', () => (
    <Component />
  ))
  .add('ak-tabs with multiple tabs with selected attribute', () => (
    <Component>
      <ak-tab selected label="Tab 1">Tab 1 has selected attribute</ak-tab>
      <ak-tab selected label="Tab 2">Tab 2 has selected attribute</ak-tab>
      <ak-tab selected label="Tab 3">Tab 3 has selected attribute</ak-tab>
    </Component>
  ))
  .add('ak-tabs with tabbable content', () => (
    <Component>
      <ak-tab selected label="Tab 1">
        <h1>Tab 1</h1>
        <p>Some text here with a <a href="#">link</a>.</p>
      </ak-tab>
      <ak-tab selected label="Tab 2">
        <h1>Tab 2</h1>
        <p>Some more text here with a <a href="#">link</a>.</p>
        <p>Another <a href="#">link</a>.</p>
      </ak-tab>
    </Component>
  ));
