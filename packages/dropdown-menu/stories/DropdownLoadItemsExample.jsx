import React, { Component } from 'react';
import Button from '@atlaskit/button';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '../src';

export default class LoadItemsExample extends Component {
  state = {
    isDropdownOpen: false,
    items: [],
  };

  render() {
    return (
      <div style={{ padding: '40px' }}>
        <button
          onClick={() => {
            const items = this.state.items.slice();
            items.push(
              <DropdownItem>New item!</DropdownItem>
            );
            this.setState({ items });
          }}
        >Load more items!</button>
        <div style={{ padding: '20px 0' }}>
          <DropdownMenu
            onOpenChange={(attrs) => {
              this.setState({ isDropdownOpen: attrs.isOpen });
            }}
            trigger={
              <Button isSelected={this.state.isDropdownOpen}>Click me, I am just a button</Button>
            }
          >
            <DropdownItemGroup>
              {this.state.items}
            </DropdownItemGroup>
          </DropdownMenu>
        </div>
      </div>
    );
  }
}
