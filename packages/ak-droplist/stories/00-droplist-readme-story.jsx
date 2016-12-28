import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code, Props, Description, Chrome } from 'akutil-readme';

import DroplistOverviewExample from './examples/DroplistOverview'; // eslint-disable-line import/no-duplicates
import DropList from '../src';

/* eslint-disable import/first, import/no-duplicates */
import DroplistOverviewExampleRaw from '!raw!./examples/DroplistOverview';
/* eslint-enable import/first, import/no-duplicates */

import { name } from '../package.json';

const droplistPropDescriptions = {
  appearance: `Controls the appearance of the dropdown. Available types: 'default', 'tall'.
  Default dropdown has scroll after its height exceeds the pre-defined amount. Tall dropdown has no
  restrictions.`,
  position: 'Position of the menu. See the documentation of ak-layer for more details.',
  triggerIsNotTabbable: `Controls whether it is possible to tab to the trigger. This property should
   be set to false if some interactive element is used inside trigger (links, buttons)`,
  isOpen: 'Controls the open state of the dropdown',
  onItemActivated: `This is a handler function which is called when an item is activated. Receives
  an object with the activated item.`,
  onOpenChange: `This is a handler function which is called when the droplist should be open/closed.
  Received an object with isOpen state`,
  context: `Context in which the droplist is used. This is a very important property from
  the accessibility point of view. Only 'menu' value is available at the moment.`,
  children: 'Content that will be rendered inside the trigger element. Accepts any html.',
};

const droplistPropTypes = {
  appearance: 'oneOf([default, tall])',
  position: 'string',
  triggerIsNotTabbable: 'bool',
  isOpen: 'bool',
  onItemActivated: 'func',
  onOpenChange: 'func',
  context: 'oneOf([menu])',
  children: 'node',
};

storiesOf(name, module)
  .add('Droplist overview', () => (
    <div>
      <Chrome title={name}>
        <Description>
          <p>This is a `base` component on which such components as ak-dropdow-menu,
            ak-single-select (TBD), ak-multi-select (TBD) are built. They should
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
    </div>
  ));
