import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Dropdown from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';

const DropdownReactComponent = reactify(Dropdown, {
  React,
  ReactDOM,
});

const avatarUrl = require('url!./doge.jpg');

storiesOf(`${name} component`, module)
  .add('simple dropdown', () => (
    <div>
      <DropdownReactComponent>
        <ak-dropdown-trigger slot="trigger">
          <ak-trigger-button>Dropdown-button</ak-trigger-button>
        </ak-dropdown-trigger>
        <ak-dropdown-item>text1</ak-dropdown-item>
        <ak-dropdown-item>text2</ak-dropdown-item>
        <ak-dropdown-item>some text here</ak-dropdown-item>
        <ak-dropdown-item>another text</ak-dropdown-item>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with avatars', () => (
    <div>
      <DropdownReactComponent>
        <ak-dropdown-trigger slot="trigger">
          <ak-trigger-button>People list</ak-trigger-button>
        </ak-dropdown-trigger>
        <ak-dropdown-item>
          <ak-avatar slot="left" src={avatarUrl} size="small" />
          Adam Smith
        </ak-dropdown-item>
        <ak-dropdown-item>
          <ak-avatar slot="left" src={avatarUrl} size="small" />
          Eva Smith
        </ak-dropdown-item>
        <ak-dropdown-item>
          <ak-avatar slot="left" src={avatarUrl} size="small" />
          Ivan Ivanov
        </ak-dropdown-item>
        <ak-dropdown-item>
          <ak-avatar slot="left" src={avatarUrl} size="small" />
          Jane Black
        </ak-dropdown-item>
        <ak-dropdown-item>
          <ak-avatar slot="left" src={avatarUrl} size="small" />
          Mike Cannon-Brookes
        </ak-dropdown-item>
        <ak-dropdown-item>
          <ak-avatar slot="left" src={avatarUrl} size="small" />
          Some very long name very long name very long
          name very long name very long name very long name
        </ak-dropdown-item>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with everything', () => (
    <div>
      <DropdownReactComponent>
        <ak-dropdown-trigger slot="trigger">
          <ak-trigger-button>Dropdown-button</ak-trigger-button>
        </ak-dropdown-trigger>
        <ak-dropdown-item>text1</ak-dropdown-item>
        <ak-dropdown-item selected>text2</ak-dropdown-item>
        <ak-dropdown-item disabled>some text here</ak-dropdown-item>
        <ak-dropdown-item>another text</ak-dropdown-item>
        <ak-dropdown-item>such long text for such small dropdown isn't it?</ak-dropdown-item>
        <ak-dropdown-item href="http://atlassian.com">This is a clickable link</ak-dropdown-item>
      </DropdownReactComponent>
    </div>
  ))
;
