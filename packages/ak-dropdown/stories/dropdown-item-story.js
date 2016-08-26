import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import { Item } from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';

const ItemReactComponent = reactify(Item, {
  React,
  ReactDOM,
});

storiesOf(`${name} item`, module)
  .add('simple item', () => (
    <div style={{ width: '300px' }}>
      <ItemReactComponent>Test item1</ItemReactComponent>
      <ItemReactComponent>Test item2</ItemReactComponent>
    </div>
  ))
  .add('selected item', () => (
    <div style={{ width: '300px' }}>
      <ItemReactComponent selected>Test item1</ItemReactComponent>
      <ItemReactComponent>Test item2</ItemReactComponent>
    </div>
  ))
  .add('focused item', () => (
    <div style={{ width: '300px' }}>
      <ItemReactComponent>Test item1</ItemReactComponent>
      <ItemReactComponent focused>Test item2</ItemReactComponent>
    </div>
  ))
  .add('disabled item', () => (
    <div style={{ width: '300px' }}>
      <ItemReactComponent>Test item1</ItemReactComponent>
      <ItemReactComponent disabled>Test item2</ItemReactComponent>
    </div>
  ))
  .add('item with very long text', () => (
    <div style={{ width: '300px' }}>
      <ItemReactComponent>Test item1</ItemReactComponent>
      <ItemReactComponent>
        Test item2 with very long text with very long text  with very long text  with very long text
      </ItemReactComponent>
    </div>
  ))
;
