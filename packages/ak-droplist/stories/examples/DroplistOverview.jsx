import React, { Component } from 'react';
import Button from 'ak-button';

import DropdownList from '../../src';

const simpleDropdownItems = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', href: 'http://atlassian.com', target: '_blank' },
      { content: 'Canberra' },
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
      onItemActivated={(attrs) => {
        console.log(attrs.item);
      }}
      triggerIsNotTabbable
      appearance="default"
      position="right top"
      context="menu"
    >
      <Button isSelected={this.state.isDropdownOpen}>...</Button>
    </DropdownList>);
  }
};

export default (
  <DroplistOverview />
);
