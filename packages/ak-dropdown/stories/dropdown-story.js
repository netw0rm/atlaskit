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
  .add('a simple ak-dropdown', () => (
    <div>
      <input type="text" placeholder="so we can test focus on dropdown from here" />
      <Component>
        <ak-dropdown-trigger>Dropdown</ak-dropdown-trigger>
        <ak-dropdown-list>
          <ak-dropdown-item>text1</ak-dropdown-item>
          <ak-dropdown-item disabled>text2</ak-dropdown-item>
          <ak-dropdown-item>text3</ak-dropdown-item>
          <ak-dropdown-item selected>
            really long text, really long text,
            really long text, really long text
          </ak-dropdown-item>
          <ak-dropdown-item>text5</ak-dropdown-item>
        </ak-dropdown-list>
      </Component>
      33
    </div>
  ));
