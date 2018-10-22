import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import { Chrome } from '@atlaskit/util-readme';
import Button from '@atlaskit/button';
import CustomIcon from '@atlaskit/icon/glyph/home-circle';
import PersonIcon from '@atlaskit/icon/glyph/person';

import AppSwitcher from '../src';
import { name } from '../package.json';

import props from './data.json';

props.analytics = action('analytics');
props.trigger = isSelected => <Button isSelected={isSelected}>...</Button>;

storiesOf(name, module)
  .addDecorator(story => <Chrome>{story()}</Chrome>)

  .add('with all components', () => <AppSwitcher {...props} />)

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

  .add('with application label', () => (
    <AppSwitcher
      {...{
        ...props,
        linkedApplications: {
          configureLink: 'https://www.atlassian.com',
          apps: [
            {
              name: 'JIRA',
              url: 'https://www.atlassian.com/#4',
              product: 'jira',
            },
            {
              name: 'Confluence',
              url: 'https://www.atlassian.com/#5',
              product: 'confluence',
              label: '7 Days Left',
            },
          ],
          error: false,
        },
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
          apps: [
            {
              name: 'JIRA',
              url: 'https://www.atlassian.com/#4',
              product: 'jira',
            },
          ],
          suggested: [
            {
              name: 'Confluence',
              product: 'confluence',
              onClick: () => {
                action('confluence.suggestion.clicked');
              },
            },
          ],
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
          suggested: [
            {
              name: 'JIRA',
              product: 'jira',
              onClick: () => {
                action('jira.suggestion.clicked');
              },
            },
            {
              name: 'Confluence',
              product: 'confluence',
              onClick: () => {
                action('confluence.suggestion.clicked');
              },
            },
          ],
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
  .add('with trusted user', () => (
    <AppSwitcher
      {...{
        ...props,
        recentContainers: [],
        isTrustedUser: true,
      }}
    />
  ))
  .add('with links', () => (
    <AppSwitcher
      {...{
        ...props,
        links: [
          {
            text: 'Add payment details',
            url: 'https://google.com/',
          },
          {
            text: 'Request a trial extension...',
            url: 'https://example.com/',
            analyticsRef: 'xyz',
          },
        ],
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

  .add('with Marketplace link', () => (
    <AppSwitcher
      {...{
        ...props,
        isMarketplaceLinkEnabled: true,
      }}
    />
  ))

  .add('with People Profile link', () => (
    <AppSwitcher
      {...{
        ...props,
        isSiteAdminLinkEnabled: true,
        isPeopleProfileLinkEnabled: true,
        peopleProfileLink: {
          name: 'People Profile',
          url: '/people',
          icon: <PersonIcon size="large" label="" />,
        },
      }}
    />
  ))

  .add('with discover applications link (Admin)', () => (
    <AppSwitcher
      {...{
        ...props,
        isSiteAdminLinkEnabled: true,
        linkedApplications: {
          configureLink: 'https://www.atlassian.com',
          apps: [
            {
              name: 'JIRA',
              url: 'https://www.atlassian.com/#4',
              product: 'jira',
            },
          ],
          suggested: [
            {
              name: 'Confluence',
              product: 'confluence',
              onClick: () => {
                action('confluence.suggestion.clicked');
              },
            },
          ],
          error: false,
          discoverApplicationsLink: true,
        },
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
