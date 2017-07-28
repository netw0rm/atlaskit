import React, { PureComponent } from 'react';
import {
  DropdownMenuStateless as Dropdown,
  DropdownItemGroupRadio,
  DropdownItemRadio,
} from '@atlaskit/dropdown-menu';

const StatelessMenuExample = class extends PureComponent {
  state = { isDropdownOpen: false }

  render() {
    return (
      <Dropdown
        isOpen={this.state.isDropdownOpen}
        onOpenChange={(attrs) => {
          this.setState({ isDropdownOpen: attrs.isOpen });
        }}
        trigger="Choose"
        triggerType="button"
      >
        <DropdownItemGroupRadio id="cities">
          <DropdownItemRadio id="sydney">Sydney</DropdownItemRadio>
          <DropdownItemRadio id="melbourne">Melbourne</DropdownItemRadio>
        </DropdownItemGroupRadio>
      </Dropdown>
    );
  }
};

export default StatelessMenuExample;
