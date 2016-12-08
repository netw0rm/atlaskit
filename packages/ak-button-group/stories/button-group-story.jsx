import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import ReactAkButton from 'ak-button';
import Dropdown from 'ak-dropdown';
import CharlieIcon from 'ak-icon/glyph/atlassian';
import React from 'react';

import ReactAkButtonGroup from '../src';
import { name } from '../package.json';

const ReactDropdown = reactify(Dropdown);

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
        <CharlieIcon label="button with icon" />
      </ReactAkButton>
    </ReactAkButtonGroup>
  ))
  .add('ak-button-group with ak-dropdown > ak-button (split button)', () => (
    <ReactAkButtonGroup style={{ border: '1px solid #AAA', display: 'block' }}>
      <ReactAkButton>Edit</ReactAkButton>
      <ReactDropdown>
        <ak-dropdown-trigger-arrow slot="trigger" />
        <ak-dropdown-item>Foo</ak-dropdown-item>
        <ak-dropdown-item>Bar</ak-dropdown-item>
        <ak-dropdown-item>Baz</ak-dropdown-item>
      </ReactDropdown>
    </ReactAkButtonGroup>
  ));
