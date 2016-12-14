import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Avatar from 'ak-avatar';
import Question from 'ak-icon/glyph/question';

import DropdownMenu from '../src';
import { name } from '../package.json';
import DropdownWithButtonExample from './DropdownWithButtonExample'; // eslint-disable-line

/* eslint-disable import/first, import/no-duplicates */
import DropdownWithButtonExampleRaw from '!raw!./DropdownWithButtonExample';
/* eslint-enable import/first, import/no-duplicates */

import {
  simpleDropdownItems,
  simpleDropdownItemsWithAvatars,
} from './DropdownsData';

const itemsOverride = `const simpleDropdownItems = ${JSON.stringify(simpleDropdownItems, null, 2)}`;

const imports = [
  ['React', 'react'],
  ['DropdownMenu', 'ak-dropdown-menu'],
];

storiesOf(name, module)
  .addCodeExampleStory('Basic Dropdown menu with a button', () => (
    <div style={{ padding: '40px' }}>
      <p>This is an example of a basic dropdown menu with the build-in trigger which looks like a
        button with the `expand` icon.</p>
      <div
        style={{
          padding: '20px 0',
        }}
      >
        <DropdownMenu
          triggerType="button"
          items={simpleDropdownItems}
        >
          Test
        </DropdownMenu>
      </div>
      <p>Empty button is also possible</p>
      <div
        style={{
          padding: '20px 0',
        }}
      >
        <DropdownMenu
          triggerType="button"
          items={simpleDropdownItems}
        />
      </div>
    </div>
  ), {
    imports,
    overrides: {
      items: 'simpleDropdownItems',
    },
    scripts: [
      itemsOverride,
    ],
  })
  .addCodeExampleStory('Basic Dropdown menu avatars/icons', () => (
    <div style={{ padding: '40px' }}>
      <p>This is an example of a basic dropdown menu with the build-in trigger which looks like a
        button with the `expand` icon.</p>
      <div
        style={{
          padding: '20px 0',
        }}
      >
        <DropdownMenu
          isOpenInitially
          triggerType="button"
          items={simpleDropdownItemsWithAvatars}
        >
          Drop menu
        </DropdownMenu>
      </div>
    </div>
  ), { imports })
  .addCodeExampleStory('Basic Dropdown menu with anything as a trigger', () => (
    <div style={{ padding: '40px' }} >
      <p>Anything can be a trigger for the dropdown menu.</p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 200,
          padding: '20px 0',
        }}
      >
        <DropdownMenu
          items={simpleDropdownItems}
        >
          click me
        </DropdownMenu>
        <DropdownMenu
          items={simpleDropdownItems}
        >
          <Avatar />
        </DropdownMenu>
        <DropdownMenu
          items={simpleDropdownItems}
        >
          <Question label="dropdown`s trigger" />
        </DropdownMenu>
      </div>
    </div>
  ), {
    imports: [...imports, ['t', 'ak-icon/glyph/question']],
    overrides: {
      items: 'simpleDropdownItems',
    },
    scripts: [
      itemsOverride,
    ],
  })
  .addCodeExampleStory('Basic Dropdown menu with a custom button', () => (
    <DropdownWithButtonExample />
  ),
  {
    scripts: [
      DropdownWithButtonExampleRaw,
    ],
  });
