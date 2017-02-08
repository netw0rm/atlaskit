import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Chrome } from '@atlaskit/util-readme';

import AppSwitcherMenu from './examples/AppSwitcherMenu';
import { name } from '../package.json';

import data from './data.json';

data.analytics = (key, props) => console.log(key, props);

storiesOf(name, module)
  .add('with all components', () => (
    <Chrome>
      <AppSwitcherMenu {...data} />
    </Chrome>
  ))

  .add('with no recent containers', () => (
    <Chrome>
      <AppSwitcherMenu
        {...{
          ...data,
          recentContainers: [],
        }}
      />
    </Chrome>
  ))

  .add('with no suggested application', () => (
    <Chrome>
      <AppSwitcherMenu
        {...{
          ...data,
          suggestedApplication: {
            show: false,
          },
        }}
      />
    </Chrome>
  ))

  .add('with only applications', () => (
    <Chrome>
      <AppSwitcherMenu
        {...{
          ...data,
          suggestedApplication: {
            show: false,
          },
          recentContainers: [],
        }}
      />
    </Chrome>
  ))

  .add('with JIRA as suggested application', () => (
    <Chrome>
      <AppSwitcherMenu
        {...{
          ...data,
          suggestedApplication: {
            show: true,
            application: 'jira',
            url: 'http://www.atlassian.com/jira',
          },
        }}
      />
    </Chrome>
  ))

  .add('with anonymous mode', () => (
    <Chrome>
      <AppSwitcherMenu
        {...{
          ...data,
          suggestedApplication: {
            show: false,
          },
          recentContainers: [],
          isAnonymousUser: true,
        }}
      />
    </Chrome>
  ))

  .add('with applinks error', () => (
    <Chrome>
      <AppSwitcherMenu
        {...{
          ...data,
          suggestedApplication: {
            show: false,
          },
          linkedApplications: {
            configureLink: 'https://www.atlassian.com',
            apps: [],
            error: true,
          },
        }}
      />
    </Chrome>
  ));
