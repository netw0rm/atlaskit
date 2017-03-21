import React from 'react';
import DropdownMenu from '@atlaskit/dropdown-menu';

const items = [
  {
    heading: '',
    items: [
      {
        content: 'This is a very long text that will be cut off at some point',
        title: 'Show something here',
        href: 'http://atlassian.com',
      },
      {
        content: 'Another very long text that doesn`t have enough space in this tiny dropdown',
        title: 'Another very long text that doesn`t have enough space in this tiny dropdown',
        href: 'http://atlassian.com',
      },
    ],
  },
];

export default <DropdownMenu
  defaultOpen
  items={items}
  triggerType="button"
>
  Wow!
</DropdownMenu>;
