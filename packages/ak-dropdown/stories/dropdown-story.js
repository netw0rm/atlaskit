import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Dropdown from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';

const Component = reactify(Dropdown, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('simple ak-dropdown', () => (
    <div>
      <Component>
        <ak-dropdown-trigger slot="trigger">Dropdown</ak-dropdown-trigger>
        <ak-dropdown-item slot="list">text1</ak-dropdown-item>
        <ak-dropdown-item slot="list" disabled>text2</ak-dropdown-item>
        <ak-dropdown-item slot="list">text3</ak-dropdown-item>
        <ak-dropdown-item slot="list" selected>
          really long text, really long text,
          really long text, really long text
        </ak-dropdown-item>
        <ak-dropdown-item slot="list">text5</ak-dropdown-item>
      </Component>
    </div>
  ))
  .add('simple ak-dropdown open by default', () => (
    <div>
      <Component open>
        <ak-dropdown-trigger slot="trigger">Dropdown</ak-dropdown-trigger>
        <ak-dropdown-item slot="list">text1</ak-dropdown-item>
        <ak-dropdown-item slot="list" disabled>text2</ak-dropdown-item>
        <ak-dropdown-item slot="list">text3</ak-dropdown-item>
        <ak-dropdown-item slot="list" selected>
          really long text, really long text,
          really long text, really long text
        </ak-dropdown-item>
        <ak-dropdown-item slot="list">text5</ak-dropdown-item>
      </Component>
    </div>
  ))
  .add('with button inside trigger', () => (
    <div>
      <Component>
        <ak-dropdown-trigger slot="trigger">
          <ak-trigger-button>Dropdown-button</ak-trigger-button>
        </ak-dropdown-trigger>
        <ak-dropdown-item slot="list">text1</ak-dropdown-item>
        <ak-dropdown-item slot="list" disabled>text2</ak-dropdown-item>
        <ak-dropdown-item slot="list">text3</ak-dropdown-item>
        <ak-dropdown-item slot="list" selected>
          really long text, really long text,
          really long text, really long text
        </ak-dropdown-item>
        <ak-dropdown-item slot="list">text5</ak-dropdown-item>
      </Component>
    </div>
  ));
