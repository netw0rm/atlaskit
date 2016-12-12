import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Avatar from 'ak-avatar';
import Question from 'ak-icon/glyph/question';

import DropdownMenu, { Trigger } from '../src';
import { name } from '../package.json';
import DropdownWithButtonExample from './DropdownWithButtonExample';
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
      <p>This is an example of a basic dropdown menu with the button component as a trigger.
        Don&#39;t forget to import trigger and set its type to &#39;button&#39;.</p>
      <div
        style={{
          padding: '20px 0',
        }}
      >
        <DropdownMenu
          isOpenInitially
          items={simpleDropdownItems}
        >
          <Trigger type="button">Test</Trigger>
        </DropdownMenu>
      </div>
    </div>
  ), { imports: [...imports, ['{ Trigger }', 'ak-dropdown-menu']] })
  .addCodeExampleStory('Basic Dropdown menu avatars/icons', () => (
    <div style={{ padding: '40px' }}>
      <p>This is an example of a basic dropdown menu with the button component as a trigger.
        Don&#39;t forget to import trigger and set its type to &#39;button&#39;.</p>
      <div
        style={{
          padding: '20px 0',
        }}
      >
        <DropdownMenu
          isOpenInitially
          items={simpleDropdownItemsWithAvatars}
        >
          <Trigger type="button">Drop menu</Trigger>
        </DropdownMenu>
      </div>
    </div>
  ), { imports: [...imports, ['{ Trigger }', 'ak-dropdown-menu']] })
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
  { imports,
    scripts: [
      itemsOverride,
      `export default class DropWithBut extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isDropdownOpen: false,
      };
    }
  
    render() {
      return (
        <DropdownMenu
          items={simpleDropdownItems}
          onOpenChange={(isOpen) => {
            this.setState({ isDropdownOpen: isOpen });
          }}
        >
          <Button isSelected={this.state.isDropdownOpen}>Click me, I&#39;m just a button</Button>
        </DropdownMenu>
      );
    };
  };`,
    ],
  });
