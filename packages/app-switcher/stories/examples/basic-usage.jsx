import React from 'react';
import Button from '@atlaskit/button';
import AppSwitcher from '../../src';

import containerImage from './nucleus.png';

const data = {
  recentContainers: [
    {
      name: 'Recent container',
      url: 'https://instance.atlassian.net/view/container',
      iconUrl: containerImage,
      type: 'confluence-space',
    },
  ],
  linkedApplications: {
    configureLink: 'https://www.atlassian.com',
    apps: [
      {
        name: 'JIRA',
        url: 'https://instance.atlassian.net/',
        product: 'jira',
      },
      {
        name: 'Confluence',
        url: 'https://instance.atlassian.net/wiki',
        product: 'confluence',
        label: '7 Days Left',
      },
    ],
    suggested: [
      {
        name: 'Bitbucket',
        product: 'bitbucket',
        onClick: () => {},
      },
    ],
    error: false,
  },
  links: [
    {
      text: 'Add payment details',
      url: 'https://google.com/',
    },
    {
      text: 'Request a trial extension...',
      url: 'https://example.com/',
      ref: 'xyz',
    },
  ],
  isAnonymousUser: false,
  i18n: {
    home: 'Home',
    apps: 'Apps',
    configure: 'Configure',
    recent: 'Recent',
    'don\'t.show.this.again': 'Don’t show this again',
    'container.confluence-space': 'Space',
    'container.jira-project': 'Project',
    'applinks.error': 'Unable to load linked applications.',
    'try.lozenge': 'try',
  },
  isDropdownOpenInitially: false,
  trigger: isSelected => (<Button isSelected={isSelected}>...</Button>),
};

export default (
  <AppSwitcher {...data} />
);
