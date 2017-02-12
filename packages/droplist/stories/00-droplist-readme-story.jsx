import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code, Props, Description, Chrome } from '@atlaskit/util-readme';

import DropList from '../src';

/* eslint-disable import/first, import/no-duplicates */
import DroplistOverviewExample from './examples/DroplistOverview';
import DroplistOverviewExampleRaw from '!raw!./examples/DroplistOverview';
import DroplistFitExample from './examples/DroplistFit';
import DroplistFitExampleRaw from '!raw!./examples/DroplistFit';
/* eslint-enable import/first, import/no-duplicates */

import { name } from '../package.json';

const droplistPropDescriptions = {
  appearance: `Controls the appearance of the dropdown. Available types: 'default', 'tall'.
  Default dropdown has scroll after its height exceeds the pre-defined amount. Tall dropdown has no
  restrictions.`,
  position: 'Position of the menu. See the documentation of ak-layer for more details.',
  isTriggerDisabled: 'Disables all trigger`s handlers and eventListeners',
  isTriggerNotTabbable: `Controls whether it is possible to tab to the trigger. This property should
   be set to true if some interactive element is used inside trigger (links, buttons)`,
  isOpen: 'Controls the open state of the dropdown',
  onItemActivated: `This is a handler function which is called when an item is activated. Receives
  an object with the activated item.`,
  onOpenChange: `This is a handler function which is called when the droplist should be open/closed.
  Received an object with isOpen state`,
  listContext: `Context in which the droplist is used. This is a very important property from
  the accessibility point of view. Only 'menu' value is available at the moment.`,
  children: 'Content of the droplist.',
  trigger: 'Content that will be rendered inside the trigger element.',
  isKeyboardInteractionDisabled: 'Disables all keyboard interactions',
};

const droplistPropTypes = {
  appearance: 'oneOf([default, tall])',
  position: 'string',
  isTriggerNotTabbable: 'bool',
  isTriggerDisabled: 'bool',
  isOpen: 'bool',
  onItemActivated: 'func',
  onOpenChange: 'func',
  listContext: 'oneOf([menu])',
  children: 'node',
  trigger: 'node',
};

storiesOf(name, module)
  .add('Droplist overview', () => (
    <Chrome title={name}>
      <Description>
        <p>This is a `base` component on which such components as ak-dropdow-menu,
          ak-single-select and ak-multi-select are built. They should
          satisfy most of the requirements and use cases and recommended to use instead.</p>
      </Description>
      <Code code={DroplistOverviewExampleRaw}>
        {DroplistOverviewExample}
      </Code>
      <Props
        component={DropList}
        descriptions={droplistPropDescriptions}
        types={droplistPropTypes}
      />
    </Chrome>
  ))
  .add('Droplist that fits container width', () => (
    <Chrome title={name}>
      <Description>
        <p>Droplist that fits container width.</p>
        {DroplistFitExample}
      </Description>
      <Code>
        {DroplistFitExampleRaw}
      </Code>
    </Chrome>
  ));
