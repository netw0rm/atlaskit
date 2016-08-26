import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import { Item } from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';

const Component = reactify(Item, {
  React,
  ReactDOM,
});

storiesOf(`${name} item`, module)
  .add('simple item', () => (
    <div style={{ width: '300px' }}>
      <Component>Test item1</Component>
      <Component>Test item2</Component>
    </div>
  ))
  .add('selected item', () => (
    <div style={{ width: '300px' }}>
      <Component selected>Test item1</Component>
      <Component>Test item2</Component>
    </div>
  ))
  .add('focused item', () => (
    <div style={{ width: '300px' }}>
      <Component>Test item1</Component>
      <Component focused>Test item2</Component>
    </div>
  ))
  .add('disabled item', () => (
    <div style={{ width: '300px' }}>
      <Component>Test item1</Component>
      <Component disabled>Test item2</Component>
    </div>
  ))
  .add('item with very long text', () => (
    <div style={{ width: '300px' }}>
      <Component>Test item1</Component>
      <Component>
        Test item2 with very long text with very long text  with very long text  with very long text
      </Component>
    </div>
  ))
;
