import React, { PureComponent } from 'react';
import { StatelessDropdownMenu } from '@atlaskit/dropdown-menu';

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

const StatelessMenuOverview = class extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpen: true,
    };
  }

  render() {
    return (<StatelessDropdownMenu
      items={simpleDropdownItems}
      isOpen={this.state.isDropdownOpen}
      onOpenChange={(attrs) => {
        console.log(attrs);
        this.setState({ isDropdownOpen: attrs.isOpen });
      }}
      onItemActivated={(attrs) => {
        console.log(attrs.item);
        this.setState({ isDropdownOpen: false });
      }}
      appearance="default"
      triggerType="button"
      position="right middle"
    >
      Choose
    </StatelessDropdownMenu>);
  }
};

export default (
  <StatelessMenuOverview />
);
