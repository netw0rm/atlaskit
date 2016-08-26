import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Dropdown from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';

const DropdownReactComponent = reactify(Dropdown, {
  React,
  ReactDOM,
});

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
      </DropdownReactComponent>
    </div>
  ))
;
