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
      <ak-tabs-tab label="Details">Details content</ak-tabs-tab>
      <ak-tabs-tab label="Diff">Diff content</ak-tabs-tab>
      <ak-tabs-tab label="Commits">Commits content</ak-tabs-tab>
      <ak-tabs-tab label="Pipeline">Pipeline content</ak-tabs-tab>
    </Component>
  ))
  .add('ak-tabs with many items', () => (
    <Component>
      <ak-tabs-tab label="1 Tab">Tab 1 content</ak-tabs-tab>
      <ak-tabs-tab label="2 Tab">Tab 2 content</ak-tabs-tab>
      <ak-tabs-tab label="3 Tab">Tab 3 content</ak-tabs-tab>
      <ak-tabs-tab label="4 Tab">Tab 4 content</ak-tabs-tab>
      <ak-tabs-tab label="5 Another tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="6 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="7 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="8 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="9 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="10 Long tab name">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="11 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab selected label="12 Initially selected tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="13 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="14 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="15 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="16 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="17 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="18 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="19 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="20 Tab">Tab content</ak-tabs-tab>
    </Component>
  ))
  .add('simple ak-tabs inside a container', () => (
    <div style={{ width: '300px', border: '1px solid black' }}>
      <Component>
        <ak-tabs-tab selected label="Details">Details content</ak-tabs-tab>
        <ak-tabs-tab label="Diff">Diff content</ak-tabs-tab>
        <ak-tabs-tab label="Commits">Commits content</ak-tabs-tab>
        <ak-tabs-tab label="Pipeline">Pipeline content</ak-tabs-tab>
      </Component>
    </div>
  ))
  .add('ak-tabs inside a container with last tab selected', () => (
    <div style={{ width: '300px', border: '1px solid black' }}>
      <Component>
        <ak-tabs-tab label="Details">Details content</ak-tabs-tab>
        <ak-tabs-tab label="Diff">Diff content</ak-tabs-tab>
        <ak-tabs-tab label="Commits">Commits content</ak-tabs-tab>
        <ak-tabs-tab selected label="Pipeline">Pipeline content</ak-tabs-tab>
      </Component>
    </div>
  ))
  .add('ak-tabs with many items inside a container', () => (
    <div style={{ width: '300px', border: '1px solid black' }}>
      <Component>
        <ak-tabs-tab selected label="Tab 1">Tab 1 content</ak-tabs-tab>
        <ak-tabs-tab label="Tab 2">Tab 2 content</ak-tabs-tab>
        <ak-tabs-tab label="Tab 3">Tab 3 content</ak-tabs-tab>
        <ak-tabs-tab label="Tab 4">Tab 4 content</ak-tabs-tab>
        <ak-tabs-tab label="Another tab 5">Tab 5 content</ak-tabs-tab>
        <ak-tabs-tab label="Tab 6">Tab 6 content</ak-tabs-tab>
        <ak-tabs-tab label="Tab 7">Tab 7 content</ak-tabs-tab>
        <ak-tabs-tab label="Tab 8">Tab 8 content</ak-tabs-tab>
        <ak-tabs-tab label="Tab 9">Tab 9 content</ak-tabs-tab>
        <ak-tabs-tab label="Long tab name 10">Tab 10 content</ak-tabs-tab>
      </Component>
    </div>
  ))
  .add('ak-tabs with no children', () => (
    <Component />
  ))
  .add('ak-tabs with multiple tabs with selected attribute', () => (
    <Component>
      <ak-tabs-tab selected label="Tab 1">Tab 1 has selected attribute</ak-tabs-tab>
      <ak-tabs-tab selected label="Tab 2">Tab 2 has selected attribute</ak-tabs-tab>
      <ak-tabs-tab selected label="Tab 3">Tab 3 has selected attribute</ak-tabs-tab>
    </Component>
  ))
  .add('ak-tabs with tabbable content', () => (
    <Component>
      <ak-tabs-tab selected label="Tab 1">
        <h1>Tab 1</h1>
        <p>Some text here with a <a href="#">link</a>.</p>
      </ak-tabs-tab>
      <ak-tabs-tab selected label="Tab 2">
        <h1>Tab 2</h1>
        <p>Some more text here with a <a href="#">link</a>.</p>
        <p>Another <a href="#">link</a>.</p>
      </ak-tabs-tab>
    </Component>
  ))
  .add('ak-tabs with a very long label', () => (
    <Component>
      <ak-tabs-tab
        selected
        label="This tab has a very long with lots of text in it that goes on and on and on and
        should take up all the horizontal space on the page, and be truncated to fit on the page.
        Here is some more text to ensure that this label does indeed take up all the available
        horizontal space and force the ak-tabs component to handle it."
      >
        <h1>Tab 1</h1>
        <p>Some text here with a <a href="#">link</a>.</p>
      </ak-tabs-tab>
    </Component>
  ))
  .add('ak-tabs with multiple very long labels', () => (
    <Component>
      <ak-tabs-tab
        selected
        label="This tab has a very long with lots of text in it that goes on and on and on and
        should take up all the horizontal space on the page, and be truncated to fit on the page.
        Here is some more text to ensure that this label does indeed take up all the available
        horizontal space and force the ak-tabs component to handle it."
      >
        <h1>Tab 1</h1>
        <p>Some text here with a <a href="#">link</a>.</p>
      </ak-tabs-tab>
      <ak-tabs-tab
        selected
        label="This second tab also is very long and has lots of text. If this tab is selected, the
        label text should be truncated with an ellipsis so that it fits onto the available space on
        the page."
      >
        <h1>Tab 2</h1>
        <p>Some text here with a <a href="#">link</a>.</p>
      </ak-tabs-tab>
    </Component>
  ));
