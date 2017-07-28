import React from 'react';
import DropdownMenu, {
  DropdownItemGroupRadio,
  DropdownItemRadio,
} from '@atlaskit/dropdown-menu';

const ComplexMenuExample = () => (
  <DropdownMenu
    trigger="Choices"
    triggerType="button"
    shouldFlip={false}
    position="right middle"
    onOpenChange={e => console.log('dropdown opened', e)}
  >
    <DropdownItemGroupRadio id="cities">
      <DropdownItemRadio id="sydney">Sydney</DropdownItemRadio>
      <DropdownItemRadio id="melbourne">Melbourne</DropdownItemRadio>
    </DropdownItemGroupRadio>
  </DropdownMenu>
);

export default ComplexMenuExample;
