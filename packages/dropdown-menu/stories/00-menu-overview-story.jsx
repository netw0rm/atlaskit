import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code, Props, Chrome, Description } from '@atlaskit/util-readme';

/* eslint-disable import/first, import/no-duplicates */
import StatelessMenuOverview from './examples/StatelessMenuOverview';
import StatelessMenuOverviewRaw from '!raw!./examples/StatelessMenuOverview';
import MenuOverview from './examples/MenuOverview';
import MenuOverviewRaw from '!raw!./examples/MenuOverview';
/* eslint-enable import/first, import/no-duplicates */

import { name } from '../package.json';
import DropdownMenu, { StatelessDropdownMenu } from '../src';

const menuPropsDescriptions = {
  appearance: `Controls the appearance of the menu. Available types: 'default', 'tall', 'manual'.
  Default menu has scroll after its height exceeds the height of 9 menu items. Tall menu has no
  restrictions. Manual menu sets the max-height from the manualMaxHeight prop.`,
  position: 'Position of the menu. See the documentation of ak-layer for more details.',
  triggerType: `Types of the menu's built-in trigger. Available types: 'default', 'button'. Default
  trigger is emty, button trigger uses the Button component with the 'expand' icon`,
  isTriggerNotTabbable: `Controls whether it is possible to tab to the trigger. This property should
   be set to true if some interactive element is used inside trigger (links, buttons)`,
  items: `List of items. Should be an array of groups (see the documentation for ak-droplist-group
  for available props). Every group should contain array of items (see the documentation
  for ak-droplist-item for available props).`,
  defaultOpen: 'Controls the open state of the dropdown',
  isOpen: 'Controls the open state of the dropdown',
  onItemActivated: `This is a handler function which is called when an item is activated. Receives
  an object with the activated item.`,
  onOpenChange: `This is a handler function which is called when the menu should be open/closed.
  Received an object with isOpen state`,
  manualMaxHeight: `If the appearance prop is set to 'manual', this prop controls the maximum 
  height (in pixels) of the dropdown.`,
  children: 'Content that will be rendered inside the trigger element. Accepts any html.',
};

const menuPropsTypes = {
  appearance: 'oneOf([default, tall, manual])',
  triggerType: 'oneOf([default, button])',
  position: 'string',
  isTriggerNotTabbable: 'bool',
  isOpen: 'bool',
  defaultOpen: 'bool',
  onItemActivated: 'func',
  onOpenChange: 'func',
  children: 'node',
  items: 'array',
};

storiesOf(name, module)
  .add('Dropdown menu (stateless) - overview', () => (
    <Chrome title="Dropdown menu (stateless) - overview">
      <Description>
        <p>Creates a dropdown menu, with optional groups, headings, icons, checkbox items,
          radio group items and disabled items.</p>
      </Description>
      <Props
        component={StatelessDropdownMenu}
        descriptions={menuPropsDescriptions}
        types={menuPropsTypes}
      />
      <Code code={StatelessMenuOverviewRaw}>
        {StatelessMenuOverview}
      </Code>
    </Chrome>
  ))
  .add('Dropdown menu (smart) - overview', () => (
    <Chrome title="Dropdown menu (smart) - overview">
      <Description>
        <p>Creates a dropdown menu, with optional groups, headings, icons, checkbox items,
          radio group items and disabled items.</p>
      </Description>
      <Props
        component={DropdownMenu}
        descriptions={menuPropsDescriptions}
        types={menuPropsTypes}
      />
      <Code code={MenuOverviewRaw}>
        {MenuOverview}
      </Code>
    </Chrome>
  ));
