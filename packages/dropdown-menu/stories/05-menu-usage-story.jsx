import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Avatar from '@atlaskit/avatar';
import Question from '@atlaskit/icon/glyph/question';
import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

import DropdownMenu, { DropdownItem } from '../src';
import { name } from '../package.json';

import DropdownLoadItemsExample from './DropdownLoadItemsExample';
import BoundariesElementExample from './examples/BoundariesElementDopdown';
import DropdownWithTriggerOptions from './DropdownWithTriggerOptions';
import StatusDropdown from './examples/StatusDropdown';
import LongItemsDropdown from './examples/LongItemsDropdown';
import WideDropdown from './examples/WideDropdown';
import ControlledItemsExample from './examples/ControlledItemsExample';
import WithThemeToggle from './examples/WithThemeToggle';

import {
  simpleDropdownItems,
  simpleDropdownItemsWithAvatars,
  lotsOfItems,
  dropdownItemsWithGroups,
  simpleDropdownItemsWithCheckboxes,
  simpleDropdownItemsWithRadio,
  simpleDropdownItemsWithRadioAndCheckbox,
  itemsWithTooltips,
} from './DropdownsData';

const DropdownWrapper = styled.div`padding: ${akGridSizeUnitless * 3}px`;
const StoryContainer = styled.div`padding: ${akGridSizeUnitless * 5}px`;

storiesOf(name, module)
  .add('Basic Dropdown menu', () => (
    <StoryContainer>
      <p>
        This is an example of a basic dropdown menu with the built-in trigger which looks like a
        button with the `expand` icon.
      </p>
      <DropdownWrapper>
        <DropdownMenu trigger="Test" triggerType="button">
          {simpleDropdownItems}
        </DropdownMenu>
      </DropdownWrapper>
    </StoryContainer>
  ))
  .add('with an empty trigger', () => (
    <StoryContainer>
      <p>A dropdown with an empty button.</p>
      <DropdownWrapper>
        <DropdownMenu triggerType="button">
          {simpleDropdownItems}
        </DropdownMenu>
      </DropdownWrapper>
    </StoryContainer>
  ))
  .add('with avatars in dropdown item', () => (
    <StoryContainer>
      <p>
        The dropdown trigger is normal, but the dropdown items contain avatars.
      </p>
      <DropdownWrapper>
        <DropdownMenu
          defaultOpen
          triggerType="button"
          trigger="Drop menu"
        >
          {simpleDropdownItemsWithAvatars}
        </DropdownMenu>
      </DropdownWrapper>
    </StoryContainer>
  ))
  .add('with checkbox items', () => (
    <StoryContainer>
      <p>
        This is an example of a basic dropdown menu with checkbox items.
      </p>
      <DropdownWrapper>
        <DropdownMenu
          defaultOpen
          triggerType="button"
          trigger="Drop menu"
          onItemActivated={item => (console.log(item))}
        >
          {simpleDropdownItemsWithCheckboxes}
        </DropdownMenu>
      </DropdownWrapper>
    </StoryContainer>
  ))
  .add('with checkbox and radio item groups', () => (
    <StoryContainer>
      <p>
        This is an example of a basic dropdown menu separate groups for checkbox and radio items.
      </p>
      <DropdownWrapper>
        <DropdownMenu
          defaultOpen
          triggerType="button"
          trigger="Drop menu"
        >
          {simpleDropdownItemsWithRadioAndCheckbox}
        </DropdownMenu>
      </DropdownWrapper>
    </StoryContainer>
  ))
  .add('with radio items', () => (
    <StoryContainer>
      <p>
        This is an example of a basic dropdown menu with radio items.
      </p>
      <DropdownWrapper>
        <DropdownMenu
          defaultOpen
          triggerType="button"
          trigger="Drop menu"
        >
          {simpleDropdownItemsWithRadio}
        </DropdownMenu>
      </DropdownWrapper>
    </StoryContainer>
  ))
  .add('with anything as a trigger', () => (
    <StoryContainer >
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
        <DropdownMenu trigger={<span tabIndex="0">click me</span>}>
          {simpleDropdownItems}
        </DropdownMenu>
        <DropdownMenu trigger={<span tabIndex="0"><Avatar /></span>}>
          {simpleDropdownItems}
        </DropdownMenu>
        <DropdownMenu trigger={<span tabIndex="0"><Question label="dropdown`s trigger" /></span>}>
          {simpleDropdownItems}
        </DropdownMenu>
      </div>
    </StoryContainer>
  ))
  .add('with "tall" appearance', () => (
    <StoryContainer>
      <p>
        This default dropdown has lots of items, and scrollbars should appear.
      </p>
      <DropdownWrapper>
        <DropdownMenu triggerType="button" trigger="Show me the scrollbar" shouldFlip={false}>
          {lotsOfItems}
        </DropdownMenu>
      </DropdownWrapper>
      <p>
        This is the same dropdown, but with the
        <code>appearance=&quot;tall&quot;</code> prop applied.
      </p>
      <p>
        Scrollbars will never appear and dropdown will grow to fit all items, so use carefully.
      </p>
      <DropdownWrapper>
        <DropdownMenu triggerType="button" trigger="No scrollbar here" appearance="tall">
          {lotsOfItems}
        </DropdownMenu>
      </DropdownWrapper>
    </StoryContainer>
  ))
  .add('constrained by the scrollParent', () => (
    <StoryContainer>
      <p>
        This default dropdown is constrained by the scrollParent.
      </p>
      { BoundariesElementExample }
    </StoryContainer>
  ))
  .add('with items in groups', () => (
    <StoryContainer>
      <p>If the dropdown menu has more than one group, then all the groups should have headings.</p>
      <DropdownWrapper>
        <DropdownMenu triggerType="button" trigger="Test">
          {dropdownItemsWithGroups}
        </DropdownMenu>
      </DropdownWrapper>
    </StoryContainer>
  ))
  .add('with interactive item add', () => (
    <DropdownLoadItemsExample />
  ))
  .add('with loading state', () => (
    <StoryContainer>
      <p>This is an example of a dropdown that is loading.</p>
      <DropdownMenu
        defaultOpen
        isLoading
        triggerType="button"
      />
    </StoryContainer>
  ))
  .add('with customized trigger button', () => (
    <DropdownWithTriggerOptions />
  ))
  .add('with Status Dropdown (JIRA)', () => <StoryContainer><StatusDropdown /></StoryContainer>)
  .add('with long items and titles', () => <StoryContainer><LongItemsDropdown /></StoryContainer>)
  .add('with container width trigger', () => <StoryContainer><WideDropdown /></StoryContainer>)
  .add('with item tooltips', () => (
    <StoryContainer>
      <div style={{ width: 600, margin: '0 auto' }}>
        <div>Try hovering over items in the dropdown</div>
        <DropdownMenu triggerType="button" trigger="Open me">
          {itemsWithTooltips}
        </DropdownMenu>
      </div>
    </StoryContainer>
  ))
  .add('with controlled items', () => (
    <StoryContainer>
      <ControlledItemsExample />
    </StoryContainer>
  ))
  .add('with disabled button trigger', () => (
    <StoryContainer>
      <p>This is an example of a dropdown with a disabled button trigger, it should not open.</p>
      <p>
        <DropdownMenu
          trigger="Disabled trigger"
          triggerType="button"
          triggerButtonProps={{ isDisabled: true }}
        >
          <DropdownItem>Item 1</DropdownItem>
        </DropdownMenu>
      </p>
    </StoryContainer>
  ))
  .add('with theme toggle', () => (
    <StoryContainer>
      <WithThemeToggle />
    </StoryContainer>
  ));
