import React from 'react';
import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from '@atlaskit/dropdown-menu';

const DefaultMenuExample = () => (
  <DropdownMenu
    trigger="Choices"
    triggerType="button"
    shouldFlip={false}
    position="right middle"
    onOpenChange={e => console.log('dropdown opened', e)}
  >
    <DropdownItemGroup>
      <DropdownItem>Sydney</DropdownItem>
      <DropdownItem>Melbourne</DropdownItem>
    </DropdownItemGroup>
  </DropdownMenu>
);

export default DefaultMenuExample;
