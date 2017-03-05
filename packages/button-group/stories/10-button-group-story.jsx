import { storiesOf } from '@kadira/storybook';
import ReactAkButton from '@atlaskit/button';
import Dropdown from '@atlaskit/dropdown-menu';
import CharlieIcon from 'ak-icon/glyph/atlassian';
import React from 'react';

import ReactAkButtonGroup from '../src';
import { name } from '../package.json';

const items = [
  {
    heading: 'dropdown heading',
    items: [
      {
        content: 'foo',
      },
      {
        content: 'bar',
      },
    ],
  },
];

const imports = [
  ['React', 'react'],
  ['ReactAkButtonGroup', 'ak-button-group'],
  ['ReactAkButton', 'ak-button'],
];

storiesOf(name, module)
  .addCodeExampleStory('plain group', () => (
    <ReactAkButtonGroup>
      <ReactAkButton>One</ReactAkButton>
      <ReactAkButton>Two</ReactAkButton>
      <ReactAkButton>Three</ReactAkButton>
    </ReactAkButtonGroup>
  ), { imports })
  .addCodeExampleStory('with one Button disabled', () => (
    <ReactAkButtonGroup>
      <ReactAkButton selected>One</ReactAkButton>
      <ReactAkButton>Two</ReactAkButton>
      <ReactAkButton disabled>Three</ReactAkButton>
    </ReactAkButtonGroup>
  ), { imports })
  .addCodeExampleStory('with one button selected and all disabled', () => (
    <ReactAkButtonGroup>
      <ReactAkButton disabled selected>One</ReactAkButton>
      <ReactAkButton disabled>Two</ReactAkButton>
      <ReactAkButton disabled>Three</ReactAkButton>
    </ReactAkButtonGroup>
  ), { imports })
  .addCodeExampleStory('with an input before for focus testing', () => (
    <div>
      <input type="text" placeholder="focus here first" />
      <ReactAkButtonGroup>
        <ReactAkButton>One</ReactAkButton>
        <ReactAkButton disabled>Two</ReactAkButton>
        <ReactAkButton>Three</ReactAkButton>
      </ReactAkButtonGroup>
    </div>
  ), { imports })
  .addCodeExampleStory('with an unexpected paragraph inside', () => (
    <ReactAkButtonGroup>
      <ReactAkButton>One</ReactAkButton>
      <ReactAkButton>Two</ReactAkButton>
      <ReactAkButton>Three</ReactAkButton>
      <p>Paragraph</p>
    </ReactAkButtonGroup>
  ), { imports })
  .addCodeExampleStory('overflows the parent div', () => (
    <div style={{ border: '1px solid #AAA', width: 75 }}>
      <ReactAkButtonGroup>
        <ReactAkButton>One</ReactAkButton>
        <ReactAkButton>Two</ReactAkButton>
        <ReactAkButton>Three</ReactAkButton>
      </ReactAkButtonGroup>
    </div>
  ), { imports })
  .addCodeExampleStory('with CSS display: block', () => (
    <ReactAkButtonGroup style={{ border: '1px solid #AAA', display: 'block' }}>
      <ReactAkButton>One</ReactAkButton>
      <ReactAkButton>Two</ReactAkButton>
      <ReactAkButton>Three</ReactAkButton>
    </ReactAkButtonGroup>
  ), { imports })
  .addCodeExampleStory('with ak-button > ak-icon', () => (
    <div style={{ border: '1px solid #AAA', display: 'block' }}>
      <ReactAkButtonGroup>
        <ReactAkButton>Edit</ReactAkButton>
        <ReactAkButton iconBefore={<CharlieIcon label="button with icon" />} />
      </ReactAkButtonGroup>
    </div>
  ), { imports: [...imports, ['CharlieIcon', 'ak-icon/glyph/atlassian']] })
  .addCodeExampleStory('with ak-dropdown > ak-button (split button)', () => (
    <div style={{ display: 'block' }}>
      <ReactAkButtonGroup>
        <ReactAkButton appearance="subtle" iconBefore={<CharlieIcon />} />
        <ReactAkButton appearance="subtle" iconBefore={<CharlieIcon />} />
        <Dropdown items={items}>
          <ReactAkButton appearance="subtle" iconBefore={<CharlieIcon />} />
        </Dropdown>
      </ReactAkButtonGroup>
    </div>
  ), {
    imports: [...imports, ['AkDropdown', 'ak-dropdown'], ['reactify', 'akutil-react']],
    scripts: ['const ReactDropdown = reactify(AkDropdown)'],
  });
