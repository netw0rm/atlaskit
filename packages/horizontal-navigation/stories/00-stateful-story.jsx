import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { AtlassianLogo } from '@atlaskit/logo';
import { name } from '../package.json';
import AkHorizontalNavigation from '../src/index';

const dropdownItems = [
  {
    items: [
      {
        content: 'Some text',
        href: '//atlassian.com',
        target: '_blank',
      },
      {
        content: 'Some text 2',
        href: '//atlassian.com',
        target: '_blank',
        isDisabled: true,
      },
      {
        content: 'Some text 4',
        href: '//atlassian.com',
        target: '_blank',
      },
    ],
  },
];

const linkItems = [
  {
    text: 'Guides',
    href: 'http://www.atlassian.com',
  },
  {
    text: 'Reference',
    href: 'http://www.atlassian.com',
    selected: true,
  },
  {
    text: 'Get help',
    href: 'http://www.atlassian.com',
  },
];

storiesOf(name, module)
  .add('DAC', () => (
    <AkHorizontalNavigation logo={<AtlassianLogo isCollapsed />} title="JIRA Service Desk Cloud" dropdownItems={dropdownItems} linkItems={linkItems} />
  ));
