import React from 'react';
import AppSwitcher from '../../src';

import containerImage from './nucleus.png';

const data = {
  recentContainers: [
    {
      name: 'Recent container',
      url: 'https://instance.atlassian.net/view/container',
      iconUrl: containerImage,
      type: 'Space',
    },
  ],
  linkedApplications: {
    configureLink: 'https://www.atlassian.com',
    apps: [
      {
        name: 'JIRA',
        url: 'https://instance.atlassian.net/',
      },
      {
        name: 'Confluence',
        url: 'https://instance.atlassian.net/wiki',
      },
    ],
  },
  suggestedApplication: {
    show: true,
    application: 'confluence',
    description: 'Issue & project tracking software',
    url: 'https://www.atlassian.com/confluence',
  },
  i18n: {
    home: 'Home',
    apps: 'Apps',
    configure: 'Configure',
    'try.other.apps': 'Try Other Atlassian Apps',
    'don\'t.show.this.again': 'Don’t show this again',
  },
};

export default (
  <AppSwitcher {...data} />
);
