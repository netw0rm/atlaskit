import React, { Component } from 'react';
import Button from 'ak-button';

import DropdownMenu from '../src';
import { simpleDropdownItems } from './DropdownsData';

export default class DropWithBut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpen: false,
    };
  }

  render() {
    return (<div style={{ padding: '40px' }}>
      <p>When you want to use your own button as a trigger don&#39;t forget to set
        &#39;isSelected&#39; property to it when the dropdown is open</p>
      <div style={{ padding: '20px 0' }}>
        <DropdownMenu
          items={simpleDropdownItems}
          triggerIsNotTabbable
          onOpenChange={(attrs) => {
            this.setState({ isDropdownOpen: attrs.isOpen });
          }}
        >
          <Button isSelected={this.state.isDropdownOpen}>Click me, I&#39;m just a button</Button>
        </DropdownMenu>
      </div>
    </div>);
  }
}
