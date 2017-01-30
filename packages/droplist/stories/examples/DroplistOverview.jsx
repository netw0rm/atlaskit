import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Group from '@atlaskit/droplist-group';
import Item from '@atlaskit/droplist-item';

import DropdownList from '../../src';

const DroplistOverview = class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpen: true,
    };
  }

  render() {
    return (<DropdownList
      isOpen={this.state.isDropdownOpen}
      onOpenChange={(attrs) => {
        console.log(attrs);
        this.setState({ isDropdownOpen: attrs.isOpen });
      }}
      isTriggerNotTabbable
      appearance="default"
      position="right top"
      listContext="menu"
      trigger={<Button isSelected={this.state.isDropdownOpen}>...</Button>}
    >
      <Group heading="Australia">
        <Item href="http://atlassian.com" target="_blank">Sydney</Item>
        <Item isHidden>Hidden item</Item>
        <Item>Canberra</Item>
        <Item
          onActivated={(attrs) => {
            console.log(attrs.item);
          }}
        >Melbourne</Item>
      </Group>
    </DropdownList>);
  }
};

export default (
  <DroplistOverview />
);
