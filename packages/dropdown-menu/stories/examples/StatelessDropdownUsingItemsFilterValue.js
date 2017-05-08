import React, { Component } from 'react';
import { StatelessDropdownMenu } from '../../src';

const simpleDropdownItems = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', href: '//atlassian.com', target: '_blank' },
      { content: 'Canberra' },
      { content: 'Melbourne' },
      { content: 'Perth' },
    ],
  },
];

export default class StatelessDropdownUsingItemsFilterValue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpen: true,
      itemsFilterValue: '',
    };
  }

  render() {
    return (<div style={{ padding: '40px' }}>
      <p>
        This is an example on how to sync the itemsFilterValue in a stateless dropdown
      </p>
      <div style={{ padding: '20px 0' }}>
        <StatelessDropdownMenu
          hasItemsFilter
          items={simpleDropdownItems}
          isOpen={this.state.isDropdownOpen}
          itemsFilterValue={this.state.itemsFilterValue}
          onItemActivated={(attrs) => {
            console.log(attrs.item);
            this.setState({ isDropdownOpen: false });
          }}
          onItemsFilterChange={(value) => {
            console.log(value);
            this.setState({ itemsFilterValue: value });
          }}
          appearance="default"
          triggerType="button"
        >
          Choose
        </StatelessDropdownMenu>
      </div>
    </div>);
  }
}
