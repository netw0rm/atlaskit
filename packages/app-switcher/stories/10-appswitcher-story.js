import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import { Chrome } from '@atlaskit/util-readme';
import Button from '@atlaskit/button';
import CustomIcon from '@atlaskit/icon/glyph/home-circle';

import AppSwitcher from '../src';
import { name } from '../package.json';

import data from './data.json';

data.analytics = (key, props) => console.log(key, props);
data.trigger = isSelected => (<Button isSelected={isSelected}>...</Button>);

storiesOf(name, module)
  .add('with all components', () => (
    <Chrome>
      <AppSwitcher {...data} />
    </Chrome>
  ))

  .add('with no recent containers', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          recentContainers: [],
        }}
      />
    </Chrome>
  ))

  .add('with no suggested application', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
        }}
      />
    </Chrome>
  ))

  .add('with only applications', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          recentContainers: [],
        }}
      />
    </Chrome>
  ))

  .add('with Confluence as suggested application', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          linkedApplications: {
            configureLink: 'https://www.atlassian.com',
            apps: [{
              name: 'JIRA',
              url: 'https://www.atlassian.com/#4',
              product: 'jira',
            }],
            suggested: [{
              name: 'Confluence',
              product: 'confluence',
              onClick: () => { action('confluence.suggestion.clicked'); },
            }],
            error: false,
          },
        }}
      />
    </Chrome>
  ))
  .add('with JIRA & Confluence as suggested applications', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          linkedApplications: {
            configureLink: 'https://www.atlassian.com',
            apps: [],
            suggested: [{
              name: 'JIRA',
              product: 'jira',
              onClick: () => { action('jira.suggestion.clicked'); },
            }, {
              name: 'Confluence',
              product: 'confluence',
              onClick: () => { action('confluence.suggestion.clicked'); },
            }],
            error: false,
          },
        }}
      />
    </Chrome>
  ))
  .add('with anonymous mode', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          recentContainers: [],
          isAnonymousUser: true,
        }}
      />
    </Chrome>
  ))

  .add('with Home link disabled', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          isHomeLinkEnabled: false,
        }}
      />
    </Chrome>
  ))

  .add('with custom Home link', () => (
    <Chrome>
      <AppSwitcher
        {...data}
        homeLink={{
          name: 'Atlassian Home',
          url: '/home/notifications',
          icon: <CustomIcon size="large" label="" />,
        }}
      />
    </Chrome>
  ))

  .add('with Site Admin link', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          isSiteAdminLinkEnabled: true,
        }}
      />
    </Chrome>
  ))

  .add('with applinks error', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          linkedApplications: {
            configureLink: 'https://www.atlassian.com',
            apps: [],
            error: true,
          },
        }}
      />
    </Chrome>
  ))
  .add('with loading state', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          isLoading: true,
        }}
      />
    </Chrome>
  ));
