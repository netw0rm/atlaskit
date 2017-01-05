import React, { Component } from 'react';
import Button from 'ak-button';
import Group from 'ak-droplist-group';
import Item from 'ak-droplist-item';

import DropdownList from '../../src';

const simpleDropdownItems = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', href: 'http://atlassian.com', target: '_blank' },
      { content: 'Canberra' },
      { content: 'Hidden item', isHidden: true },
      { content: 'Melbourne' },
      { content: 'Perth' },
    ],
  },
];

const DroplistOverview = class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpen: true,
      items: simpleDropdownItems,
    };
  }

  render() {
    return (<DropdownList
      items={simpleDropdownItems}
      isOpen={this.state.isDropdownOpen}
      onOpenChange={(attrs) => {
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
