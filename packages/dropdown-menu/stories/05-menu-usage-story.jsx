import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Avatar from 'ak-avatar';
import Question from 'ak-icon/glyph/question';
import { Code, Chrome, Description } from 'akutil-readme';

import DropdownMenu from '../src';
import { name } from '../package.json';
import DropdownWithButtonExample from './DropdownWithButtonExample'; // eslint-disable-line
import DropdownLoadItemsExample from './DropdownLoadItemsExample'; // eslint-disable-line
import StatusDropdown from './examples/StatusDropdown'; // eslint-disable-line

/* eslint-disable import/first, import/no-duplicates */
import DropdownWithButtonExampleRaw from '!raw!./DropdownWithButtonExample';
import DropdownLoadItemsExampleRaw from '!raw!./DropdownLoadItemsExample';
import StatusDropdownRaw from '!raw!./examples/StatusDropdown';
/* eslint-enable import/first, import/no-duplicates */

import {
  simpleDropdownItems,
  simpleDropdownItemsWithAvatars,
  lotsOfItems,
  dropdownItemsWithGroups,
  simpleDropdownItemsWithCheckboxes,
  simpleDropdownItemsWithRadio,
} from './DropdownsData';

const itemsOverride = `const simpleDropdownItems = ${JSON.stringify(simpleDropdownItems, null, 2)}`;
const dropdownItemsWithGroupsOverride =
  `const dropdownItemsWithGroups = ${JSON.stringify(dropdownItemsWithGroups, null, 2)}`;

const imports = [
  ['React', 'react'],
  ['DropdownMenu', 'ak-dropdown-menu'],
];

storiesOf(name, module)
  .addCodeExampleStory('Basic Dropdown menu with a button', () => (
    <div style={{ padding: '40px' }}>
      <p>This is an example of a basic dropdown menu with the build-in trigger which looks like a
        button with the `expand` icon.</p>
      <div style={{ padding: '20px 0' }}>
        <DropdownMenu triggerType="button" items={simpleDropdownItems}>
          Test
        </DropdownMenu>
      </div>
      <p>Empty button is also possible</p>
      <div style={{ padding: '20px 0' }}>
        <DropdownMenu triggerType="button" items={simpleDropdownItems} />
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
      <div style={{ padding: '20px 0' }}>
        <DropdownMenu
          defaultOpen
          triggerType="button"
          items={simpleDropdownItemsWithAvatars}
        >
          Drop menu
        </DropdownMenu>
      </div>
    </div>
  ), { imports })
  .addCodeExampleStory('Basic Dropdown menu with checkbox items', () => (
    <div style={{ padding: '40px' }}>
      <p>This is an example of a basic dropdown menu with checkbox items.
        Use it when you want to present options the user can select or enable.</p>
      <div style={{ padding: '20px 0' }}>
        <DropdownMenu
          defaultOpen
          triggerType="button"
          items={simpleDropdownItemsWithCheckboxes}
          onItemActivated={item => (console.log(item))}
        >
          Drop menu
        </DropdownMenu>
      </div>
    </div>
  ), { imports, overrides: { style: '...' } })
  .addCodeExampleStory('Basic Dropdown menu with radio items', () => (
    <div style={{ padding: '40px' }}>
      <p>This is an example of a basic dropdown menu with radio items.
        Use it when you want to present options the user can select or enable.</p>
      <div style={{ padding: '20px 0' }}>
        <DropdownMenu
          defaultOpen
          triggerType="button"
          items={simpleDropdownItemsWithRadio}
          onItemActivated={item => (console.log(item))}
        >
          Drop menu
        </DropdownMenu>
      </div>
    </div>
  ), { imports, overrides: { style: '...' } })
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
        <DropdownMenu items={simpleDropdownItems}>
          click me
        </DropdownMenu>
        <DropdownMenu items={simpleDropdownItems}>
          <Avatar />
        </DropdownMenu>
        <DropdownMenu items={simpleDropdownItems}>
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
  })
  .addCodeExampleStory('Different appearances of the dropdown menu: default, tall', () => (
    <div style={{ padding: '40px' }}>
      <p>This is an example of a default dropdown with lots of items. If there are
      more items than it can handle then the scroll appears.</p>
      <div style={{ padding: '20px 0' }}>
        <DropdownMenu triggerType="button" items={lotsOfItems}>
          Drop it!
        </DropdownMenu>
      </div>
      <p>This is an example of a tall dropdown with lots of items. It will never have scroll, so
      use it with caution.</p>
      <div style={{ padding: '20px 0' }}>
        <DropdownMenu triggerType="button" items={lotsOfItems} appearance="tall">
          Drop it!
        </DropdownMenu>
      </div>
    </div>
  ), {
    imports,
    overrides: {
      items: 'lotsOfItems',
    },
  })
  .addCodeExampleStory('Dropdown menu with a few groups', () => (
    <div style={{ padding: '40px' }}>
      <p>If the dropdown menu has more than one group, then all the groups should have headings.</p>
      <div style={{ padding: '20px 0' }}>
        <DropdownMenu triggerType="button" items={dropdownItemsWithGroups}>
          Test
        </DropdownMenu>
      </div>
    </div>
  ), {
    imports,
    overrides: {
      items: 'dropdownItemsWithGroups',
    },
    scripts: [dropdownItemsWithGroupsOverride],
  })
  .addCodeExampleStory('Load more items', () => (
    <DropdownLoadItemsExample />
  ), {
    scripts: [
      DropdownLoadItemsExampleRaw,
    ],
  })
  .add('Status Dropdown (special for JIRA)', () => (
    <Chrome title="Status Dropdown">
      <Description>
        <p>Example of the Status Dropdown for JIRA</p>
      </Description>
      <Code code={StatusDropdownRaw}>
        {StatusDropdown}
      </Code>
      <div style={{ height: '100px' }} />
    </Chrome>
  ), { imports, overrides: { style: '...' } });
