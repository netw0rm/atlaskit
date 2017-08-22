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
      <DropdownItemGroupRadio title="Australia">
        <DropdownItemRadio id="sydney">Sydney</DropdownItemRadio>
      </DropdownItemGroupRadio>
      <DropdownItemGroupRadio title="United States">
        <DropdownItemRadio id="san-francisco">San Francisco</DropdownItemRadio>
        <DropdownItemRadio id="austin">Austin</DropdownItemRadio>
      </DropdownItemGroupRadio>
      <DropdownItemGroupRadio title="Elsewhere">
        <DropdownItemRadio id="amsterdam">Amsterdam</DropdownItemRadio>
        <DropdownItemRadio id="yokohama">Yokohama</DropdownItemRadio>
        <DropdownItemRadio id="manila">Manila</DropdownItemRadio>
      </DropdownItemGroupRadio>
    </DropdownItemGroupRadio>
  </DropdownMenu>
);

export default ComplexMenuExample;
