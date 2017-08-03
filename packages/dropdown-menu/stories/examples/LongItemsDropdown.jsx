import React from 'react';
import DropdownMenu, { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';

const items = (
  <DropdownItemGroup>
    <DropdownItem
      href="//atlassian.com"
      title="Show something here"
    >
      This is a very long text that will be cut off at some point
    </DropdownItem>
    <DropdownItem
      href="//atlassian.com"
      title="Another very long text that doesn`t have enough space in this tiny dropdown"
    >
      Another very long text that doesn`t have enough space in this tiny dropdown
    </DropdownItem>
  </DropdownItemGroup>
);

const multilineItems = (
  <DropdownItemGroup>
    <DropdownItem
      href="//atlassian.com"
      shouldAllowMultiline
      title="Show something here"
    >
      This is a very long text that will be broken on to a new line
    </DropdownItem>
    <DropdownItem
      href="//atlassian.com"
      shouldAllowMultiline
      title="Another very long text that doesn`t have enough space in this tiny dropdown"
    >
      Another very long text that will be broken on to a new line
    </DropdownItem>
  </DropdownItemGroup>
);

export default () => (
  <div>
    <p>
      This is an example a dropdown with long items showing the default behaviour
    </p>
    <p>
      <DropdownMenu
        defaultOpen
        trigger="Long Items"
        triggerType="button"
      >
        {items}
      </DropdownMenu>
    </p>
    <p>
      And this shows a dropdown with long items with multiline behaviour
    </p>
    <p>
      <DropdownMenu
        trigger="Long multiline Items"
        triggerType="button"
      >
        {multilineItems}
      </DropdownMenu>
    </p>
  </div>
);
