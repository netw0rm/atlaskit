import { storiesOf } from '@kadira/storybook';
import React from 'react';

import DropdownMenu, { Trigger } from '../src';
import { name } from '../package.json';

const simpleDropdownItems = [
  {
    heading: 'Heading for the group',
    items: [
      {
        content: 'Some text',
        elemBefore: '1',
        isActive: true,
        href: 'http://atlassian.com',
        target: '_blank',
      },
      {
        content: 'Some text 2',
        elemBefore: '2',
        isDisabled: true,
      },
      {
        content: 'Some text 4',
        elemBefore: '3',
      },
    ],
  },
  {
    heading: 'Heading for the group 2',
    items: [
      {
        content: 'Another text ',
        elemBefore: '1',
        isActive: true,
      },
      {
        content: 'Another text 2',
        elemBefore: '2',
        isDisabled: true,
      },
      {
        content: 'Another text 4',
        elemBefore: '3',
      },
    ],
  },
];

storiesOf(name, module)
  .add('a simple ak-dropdown-menu', () => (
    <div style={{ padding: '40px' }}>
      <DropdownMenu
        isOpen
        items={simpleDropdownItems}
      >
        <Trigger type="button">Test</Trigger>
      </DropdownMenu>

      text in between
    </div>
  ));
