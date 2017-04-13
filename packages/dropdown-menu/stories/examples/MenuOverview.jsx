import React, { PureComponent } from 'react';
import DropdownMenu from '@atlaskit/dropdown-menu';

const simpleDropdownItems = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', type: 'radio' },
      { content: 'Canberra', type: 'radio' },
      { content: 'Melbourne', type: 'radio' },
      { content: 'Perth', type: 'radio' },
    ],
  },
];

class MenuOverview extends PureComponent {
  render() {
    return (
      <DropdownMenu
        appearance="default"
        items={simpleDropdownItems}
        onOpenChange={(attrs) => {
          console.log(attrs);
          this.setState({ isDropdownOpen: attrs.isOpen });
        }}
        onItemActivated={(attrs) => {
          console.log(attrs.item);
          this.setState({ isDropdownOpen: false });
        }}
        position="right middle"
        triggerType="button"
      >
        Choose
      </DropdownMenu>
    );
  }
}

export default <MenuOverview />;
