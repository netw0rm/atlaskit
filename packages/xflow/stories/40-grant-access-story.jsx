import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';

import { GrantAccessBase } from '../src/request-or-start-trial/components/GrantAccess';
import setupStorybookAnalytics from './util/setupStorybookAnalytics';

import { ACTIVE, ACTIVATING } from '../src/common/productProvisioningStates';

const defaultProps = {
  productLogo: <ConfluenceLogo />,
  optionItems: [
    {
      value: 'everyone',
      label: 'Everyone in Jira Software',
    },
    {
      value: 'site-admins',
      label: 'Site admins only',
    },
    {
      value: 'specific-users',
      label: 'Specific users',
    },
  ],
  userSelectPlaceholder: 'Start typing a username',
  usersOption: 'specific-users',
  learnMoreLink: 'https://www.atlassian.com/software/confluence/pricing?tab=cloud',
  // selectLabel: 'Select users',
  defaultSelectedRadio: 'everyone',
  progress: 0,
  status: ACTIVATING,
  heading: 'Who should have access?',
  defaultAccess: 'Everyone in Jira will have access to Confluence.',

  userSelectInFocus: false,
  userSelectIsInvalid: false,
  changeUsers: false,
  spinnerActive: false,
  continueButtonDisabled: false,

  grantAccessToUsers: async (...args) => {
    action('grantAccessToUsers')();
    console.log('grantAccessToUsers', ...args);
  },

  retrieveUsers: () =>
    Promise.resolve([
      { name: 'lhunt', 'display-name': 'Lachlan Hunt', email: 'lhunt@example.com', attributes: { attributes: [{ name: 'atlassianid.openid.identity', values: ['https://id.atlassian.com/openid/v2/u/1'] }] } },
      { name: 'awakeling', 'display-name': 'Andrew Wakeling', email: 'awakeling@example.com', attributes: { attributes: [{ name: 'atlassianid.openid.identity', values: ['https://id.atlassian.com/openid/v2/u/2'] }] } },
      { name: 'ahammond', 'display-name': 'Andrew Hammond', email: 'ahammond@example.com', attributes: { attributes: [{ name: 'atlassianid.openid.identity', values: ['https://id.atlassian.com/openid/v2/u/3'] }] } },
      { name: 'mtruong', 'display-name': 'Michael Truong', email: 'mtruong@example.com', attributes: { attributes: [{ name: 'atlassianid.openid.identity', values: ['https://id.atlassian.com/openid/v2/u/4'] }] } },
      { name: 'gburrows', 'display-name': 'George Burrows', email: 'gburrows@example.com', attributes: { attributes: [{ name: 'atlassianid.openid.identity', values: ['https://id.atlassian.com/openid/v2/u/5'] }] } },
    ]),

  onComplete: action('GrantAccessToUsers onComplete'),
};

storiesOf('request-or-start-trial/GrantAccess')
  .add('Grant Access dialog', () => setupStorybookAnalytics(<GrantAccessBase {...defaultProps} />))
  .add('Grant Access dialog, Manage ("everyone" selected)', () =>
    setupStorybookAnalytics(
      <GrantAccessBase {...defaultProps} changeUsers defaultSelectedRadio="everyone" />
    )
  )
  .add('Grant Access dialog, Manage ("site-admins" selected)', () =>
    setupStorybookAnalytics(
      <GrantAccessBase {...defaultProps} changeUsers defaultSelectedRadio="site-admins" />
    )
  )
  .add('Grant Access dialog, Manage ("specific-users" selected)', () =>
    setupStorybookAnalytics(
      <GrantAccessBase
        {...defaultProps}
        changeUsers
        defaultSelectedRadio="specific-users"
        userSelectInFocus
      />
    )
  )
  .add('Grant Access dialog, Manage ("specific-users" selected, error)', () =>
    setupStorybookAnalytics(
      <GrantAccessBase
        {...defaultProps}
        changeUsers
        defaultSelectedRadio="specific-users"
        userSelectInFocus
        userSelectIsInvalid
      />
    )
  )
  .add('Grant Access dialog, error retrieving users', () =>
    setupStorybookAnalytics(
      <GrantAccessBase
        {...defaultProps}
        retrieveUsers={() => Promise.reject(new Error('Error retrieving users.'))}
        changeUsers
        defaultSelectedRadio="specific-users"
        userSelectInFocus
        userSelectIsInvalid
      />
    )
  )
  .add('Grant Access dialog with spinner', () =>
    setupStorybookAnalytics(
      <GrantAccessBase {...defaultProps} spinnerActive continueButtonDisabled />
    )
  )
  .add('Grant Access dialog (ACTIVATING) progress bar (25%)', () =>
    setupStorybookAnalytics(<GrantAccessBase {...defaultProps} progress={0.25} />)
  )
  .add('Grant Access dialog (ACTIVATING Error) progress bar (100%)', () =>
    setupStorybookAnalytics(<GrantAccessBase {...defaultProps} progress={1} />)
  )
  .add('Grant Access dialog (ACTIVE) progress bar (100%)', () =>
    setupStorybookAnalytics(<GrantAccessBase {...defaultProps} progress={1} status={ACTIVE} />)
  )
  .add('Grant Access dialog, Manage Error flag after Continue', () =>
    setupStorybookAnalytics(
      <GrantAccessBase
        {...defaultProps}
        changeUsers
        defaultSelectedRadio="everyone"
        grantAccessToUsers={() => {
          action('grantAccessToUsers')();
          console.log('grantAccessToUsers', ...arguments);
          return new Promise((_, reject) => setTimeout(reject(new Error('Error granting access.')), 1500));
        }}
      />
    )
  );
