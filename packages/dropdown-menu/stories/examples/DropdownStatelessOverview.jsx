import React, { Component } from 'react';
import {
  DropdownMenuStateless,
  DropdownItemGroup,
  DropdownItemGroupCheckbox,
  DropdownItemGroupRadio,
  DropdownItem,
  DropdownItemCheckbox,
  DropdownItemRadio,
} from '@atlaskit/dropdown-menu';

class DropdownStatelessOverview extends Component {
  state = {
    isOpen: false,
  }

  handleOpenChange = ({ isOpen }) => {
    this.setState({ isOpen });
  }

  render() {
    return (
      <DropdownMenuStateless
        isOpen={this.state.isOpen}
        onOpenChange={this.handleOpenChange}
        trigger="Open dropdown"
        triggerType="button"
      >
        <DropdownItemGroup>
          <DropdownItem>This item a DropdownItem</DropdownItem>
          <DropdownItem>Another DropdownItem</DropdownItem>
        </DropdownItemGroup>
        <DropdownItemGroupCheckbox id="checkboxes" title="Checkbox items">
          <DropdownItemCheckbox id="checkbox-1">This item a checkbox item</DropdownItemCheckbox>
          <DropdownItemCheckbox id="checkbox-2">Another checkbox item</DropdownItemCheckbox>
        </DropdownItemGroupCheckbox>
        <DropdownItemGroupRadio id="radios" title="Radio items">
          <DropdownItemRadio id="radio-1">This item a radio item</DropdownItemRadio>
          <DropdownItemRadio id="radio-2">Another radio item</DropdownItemRadio>
        </DropdownItemGroupRadio>
      </DropdownMenuStateless>
    );
  }
}

export default <DropdownStatelessOverview />;
