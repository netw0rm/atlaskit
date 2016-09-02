import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import { Item } from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import 'ak-avatar';
const ItemReactComponent = reactify(Item, {
  React,
  ReactDOM,
});

const avatarUrl = require('url!./doge.jpg');

storiesOf(`${name} item`, module)
  .add('simple item', () => (
    <div style={{ width: '300px' }}>
      <ItemReactComponent>Test item</ItemReactComponent>
    </div>
  ))
  .add('selected item', () => (
    <div style={{ width: '300px' }}>
      <ItemReactComponent selected>Test item1</ItemReactComponent>
    </div>
  ))
  .add('focused item', () => (
    <div style={{ width: '300px' }}>
      <ItemReactComponent focused>Test item1</ItemReactComponent>
    </div>
  ))
  .add('disabled item', () => (
    <div style={{ width: '300px' }}>
      <ItemReactComponent disabled>Test item1</ItemReactComponent>
    </div>
  ))
  .add('item with very long text', () => (
    <div style={{ width: '300px' }}>
      <ItemReactComponent>
        Test item2 with very long text with very long text  with very long text  with very long text
      </ItemReactComponent>
    </div>
  ))
  .add('item with link', () => (
    <div style={{ width: '300px' }}>
      <ItemReactComponent href="http://atlassian.com">This item is a clickable link</ItemReactComponent>
    </div>
  ))
  .add('item with avatar', () => (
    <div style={{ width: '300px' }}>
      <ItemReactComponent>
        <ak-avatar
          slot="left"
          src={avatarUrl}
          size="small"
        />
        This item has an avatar
      </ItemReactComponent>
    </div>
  ))
  .add('item with avatar and very long text', () => (
    <div style={{ width: '300px' }}>
      <ItemReactComponent>
        <ak-avatar
          slot="left"
          src={avatarUrl}
          size="small"
        />
        This item has an avatar and very very very very long text inside
      </ItemReactComponent>
    </div>
  ))
;
