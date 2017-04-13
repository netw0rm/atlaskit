import React, { PureComponent } from 'react';
import { DropdownMenuStateless } from '@atlaskit/dropdown-menu';

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

class StatelessMenuOverview extends PureComponent {
  state = { isDropdownOpen: true };

  render() {
    return (
      <DropdownMenuStateless
        appearance="default"
        isOpen={this.state.isDropdownOpen}
        items={simpleDropdownItems}
        onItemActivated={(attrs) => {
          console.log(attrs.item);
          this.setState({ isDropdownOpen: false });
        }}
        onOpenChange={(attrs) => {
          console.log(attrs);
          this.setState({ isDropdownOpen: attrs.isOpen });
        }}
        position="right middle"
        triggerType="button"
      >
        Choose
      </DropdownMenuStateless>
    );
  }
}

export default <StatelessMenuOverview />;
