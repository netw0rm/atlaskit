import React from 'react';
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
    url: 'https://www.atlassian.com/confluence',
  },
  i18n: {
    home: 'Home',
    apps: 'Apps',
    configure: 'Configure',
    'try.other.apps': 'Try Other Atlassian Apps',
    'don\'t.show.this.again': 'Don’t show this again',
    'container.confluence-space': 'Space',
    'container.jira-project': 'Project',
    'suggested.application.description.confluence': 'Collaboration and content sharing',
    'suggested.application.description.jira': 'Issue & project tracking software',
  },
};

export default (
  <AppSwitcher {...data} />
);
