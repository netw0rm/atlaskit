import React from 'react';
import Avatar from 'ak-avatar';

export const simpleDropdownItems = [
  {
    heading: 'Heading',
    items: [
      {
        content: 'Some text',
        href: 'http://atlassian.com',
        target: '_blank',
      },
      {
        content: 'Some text 2',
        href: 'http://atlassian.com',
        target: '_blank',
        isDisabled: true,
      },
      {
        content: 'Some text 4',
        href: 'http://atlassian.com',
        target: '_blank',
      },
    ],
  },
];

export const simpleDropdownItemsWithAvatars = [
  {
    heading: '',
    items: [
      {
        content: 'Some text',
        elemBefore: <Avatar size="small" />,
      },
      {
        content: 'Some text 2',
        elemBefore: <Avatar size="small" />,
      },
      {
        content: 'Some text 4',
        elemBefore: <Avatar size="small" />,
      },
    ],
  },
];
