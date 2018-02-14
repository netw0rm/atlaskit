import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import { Chrome } from '@atlaskit/util-readme';
import Button from '@atlaskit/button';
import CustomIcon from '@atlaskit/icon/glyph/home-circle';

import AppSwitcher from '../src';
import { name } from '../package.json';

import props from './data.json';

props.analytics = action('analytics');
props.trigger = isSelected => (<Button isSelected={isSelected}>...</Button>);

storiesOf(name, module)
  .addDecorator(story => (
    <Chrome>
      {story()}
    </Chrome>
  ))

  .add('with all components', () => (
    <AppSwitcher {...props} />
  ))

  .add('with no recent containers', () => (
    <AppSwitcher
      {...{
        ...props,
        recentContainers: [],
      }}
    />
  ))

  .add('with no suggested application', () => (
    <AppSwitcher
      {...{
        ...props,
      }}
    />
  ))

  .add('with only applications', () => (
    <AppSwitcher
      {...{
        ...props,
        recentContainers: [],
      }}
    />
  ))

  .add('with Confluence as suggested application', () => (
    <AppSwitcher
      {...{
        ...props,
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
  ))
  .add('with JIRA & Confluence as suggested applications', () => (
    <AppSwitcher
      {...{
        ...props,
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
  ))
  .add('with anonymous mode', () => (
    <AppSwitcher
      {...{
        ...props,
        recentContainers: [],
        isAnonymousUser: true,
      }}
    />
  ))
  .add('with links', () => (
    <AppSwitcher
      {...{
        ...props,
        links: [{
          text: 'Add payment details',
          url: 'https://google.com/',
        }, {
          text: 'Request a trial extension...',
          url: 'https://example.com/',
        }],
      }}
    />
  ))

  .add('with Home link disabled', () => (
    <AppSwitcher
      {...{
        ...props,
        isHomeLinkEnabled: false,
      }}
    />
  ))

  .add('with custom Home link', () => (
    <AppSwitcher
      {...props}
      homeLink={{
        name: 'Atlassian Home',
        url: '/home/notifications',
        icon: <CustomIcon size="large" label="" />,
      }}
    />
  ))

  .add('with Site Admin link', () => (
    <AppSwitcher
      {...{
        ...props,
        isSiteAdminLinkEnabled: true,
      }}
    />
  ))

  .add('with applinks error', () => (
    <AppSwitcher
      {...{
        ...props,
        linkedApplications: {
          configureLink: 'https://www.atlassian.com',
          apps: [],
          error: true,
        },
      }}
    />
  ))
  .add('with loading state', () => (
    <AppSwitcher
      {...{
        ...props,
        isLoading: true,
      }}
    />
  ));
