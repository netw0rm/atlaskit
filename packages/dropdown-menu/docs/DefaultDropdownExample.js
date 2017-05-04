import React from 'react';
import DropdownMenu from '@atlaskit/dropdown-menu';

const simpleDropdownItems = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', type: 'radio' },
      { content: 'Canberra', type: 'radio' },
      { content: 'Melbourne', type: 'radio' },
      { content: 'Perth', type: 'radio' },
      {
        content: 'While not a city, this line demonstrates what happens when we have a line that is too long',
        type: 'radio',
      },
    ],
  },
];

const DefaultMenuExample = () => (
  <DropdownMenu
    items={simpleDropdownItems}
    onItemActivated={e => console.log(e.item)}
    triggerType="button"
  >
    Choose
  </DropdownMenu>
);

export default DefaultMenuExample;
