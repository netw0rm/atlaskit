import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkButton from 'ak-button';
import Dropdown from 'ak-dropdown';
import Icon from 'ak-icon';
import AkButtonGroup from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
// import styles from 'style!./../src/host.less';

const ReactAkButtonGroup = reactify(AkButtonGroup, { React, ReactDOM });
const ReactAkButton = reactify(AkButton, { React, ReactDOM });
const ReactIcon = reactify(Icon, { React, ReactDOM });
const ReactDropdown = reactify(Dropdown, { React, ReactDOM });

storiesOf(name, module)
  .add('plain ak-button-group of ak-buttons', () => (
    <ReactAkButtonGroup>
      <ReactAkButton>One</ReactAkButton>
      <ReactAkButton>Two</ReactAkButton>
      <ReactAkButton>Three</ReactAkButton>
    </ReactAkButtonGroup>
  ))
  .add('ak-button-group of ak-buttons with one disabled', () => (
    <ReactAkButtonGroup>
      <ReactAkButton selected>One</ReactAkButton>
      <ReactAkButton>Two</ReactAkButton>
      <ReactAkButton disabled>Three</ReactAkButton>
    </ReactAkButtonGroup>
  ))
  .add('ak-button-group of ak-buttons with one selected and all disabled', () => (
    <ReactAkButtonGroup>
      <ReactAkButton disabled selected>One</ReactAkButton>
      <ReactAkButton disabled>Two</ReactAkButton>
      <ReactAkButton disabled>Three</ReactAkButton>
    </ReactAkButtonGroup>
  ))
  .add('ak-button-group of ak-buttons with an input before for focus testing', () => (
    <div>
      <input type="text" placeholder="focus here first" />
      <ReactAkButtonGroup>
        <ReactAkButton>One</ReactAkButton>
        <ReactAkButton disabled>Two</ReactAkButton>
        <ReactAkButton>Three</ReactAkButton>
      </ReactAkButtonGroup>
    </div>
  ))
  .add('ak-button-group with ak-buttons and an unexpected paragraph inside', () => (
    <ReactAkButtonGroup>
      <ReactAkButton>One</ReactAkButton>
      <ReactAkButton>Two</ReactAkButton>
      <ReactAkButton>Three</ReactAkButton>
      <p>Paragraph</p>
    </ReactAkButtonGroup>
  ))
  .add('ak-button-group that overflows the parent div', () => (
    <div style={{ border: '1px solid #AAA', width: 75 }}>
      <ReactAkButtonGroup>
        <ReactAkButton>One</ReactAkButton>
        <ReactAkButton>Two</ReactAkButton>
        <ReactAkButton>Three</ReactAkButton>
      </ReactAkButtonGroup>
    </div>
  ))
  .add('ak-button-group with CSS display: block', () => (
    <ReactAkButtonGroup style={{ border: '1px solid #AAA', display: 'block' }}>
      <ReactAkButton>One</ReactAkButton>
      <ReactAkButton>Two</ReactAkButton>
      <ReactAkButton>Three</ReactAkButton>
    </ReactAkButtonGroup>
  ))
  .add('ak-button-group with ak-button > ak-icon', () => (
    <ReactAkButtonGroup style={{ border: '1px solid #AAA', display: 'block' }}>
      <ReactAkButton>Edit</ReactAkButton>
      <ReactAkButton>
        <ReactIcon glyph="question" />
      </ReactAkButton>
    </ReactAkButtonGroup>
  ))
  .add('ak-button-group with ak-dropdown > ak-button (split button)', () => (
    <ReactAkButtonGroup style={{ border: '1px solid #AAA', display: 'block' }}>
      <ReactAkButton>Edit</ReactAkButton>
      <ReactDropdown>
        <ak-dropdown-trigger-arrow slot="trigger"></ak-dropdown-trigger-arrow>
        <ak-dropdown-item>Foo</ak-dropdown-item>
        <ak-dropdown-item>Bar</ak-dropdown-item>
        <ak-dropdown-item>Baz</ak-dropdown-item>
      </ReactDropdown>
    </ReactAkButtonGroup>
  ));
