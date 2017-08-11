import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { GrantAccessBase } from '../src/start-trial/components/GrantAccess';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';

import { ConfluenceLogo } from '@atlaskit/logo';

const defaultProps = {
  productLogo: <ConfluenceLogo />,
  userSelectInFocus: false,
  userSelectIsInvalid: false,
  changeUsers: false,
  defaultSelectedRadio: 'everyone',
  heading: 'Who should have access?',
  defaultAccess: (
    <p>
      <strong>Everyone in JIRA Software</strong> will have <br /> access to Confluence.
    </p>
  ),
  learnMoreLinkText: 'Learn more',
  notifyUsers: 'Notify these users',
  optionItems: [
    {
      value: 'everyone',
      label: 'Everyone in JIRA Software',
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
  chooseOption: 'Choose an option',
  affectBill: 'How will this affect my bill?',
  spinnerActive: false,
  continueButtonDisabled: false,
  goToLearnMore: () => {
    console.log('Go to Learn More!');
  },
  retrieveUsers: () =>
    Promise.resolve([
      { name: 'lhunt', displayName: 'Lachlan Hunt', email: 'lhunt@example.com' },
      { name: 'awakeling', displayName: 'Andrew Wakeling', email: 'awakeling@example.com' },
      { name: 'ahammond', displayName: 'Andrew Hammond', email: 'ahammond@example.com' },
      { name: 'mtruong', displayName: 'Michael Truong', email: 'mtruong@example.com' },
      { name: 'gburrows', displayName: 'George Burrows', email: 'gburrows@example.com' },
    ]),

  grantAccessToUsers: async (...args) => {
    console.log('grantAccessToUsers', ...args);
  },

  onComplete: () => {
    console.log('GrantAccessToUsers onComplete called');
  },
};

storiesOf('GrantAccess')
  .add('Show Grant Access dialog', () =>
    setupStorybookAnalytics(<GrantAccessBase {...defaultProps} analyticsId="growth.happy" />)
  )
  .add('Show Grant Access dialog with change users open', () =>
    setupStorybookAnalytics(
      <GrantAccessBase
        {...defaultProps}
        analyticsId="growth.happy"
        changeUsers
        defaultSelectedRadio="everyone"
      />
    )
  )
  .add('Show Grant Access dialog with site admins only selected', () =>
    setupStorybookAnalytics(
      <GrantAccessBase {...defaultProps} changeUsers defaultSelectedRadio="site-admins" />
    )
  )
  .add('Show Grant Access dialog error state no specific users selected', () =>
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
  .add('Show Grant Access dialog, error retrieving users', () =>
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
  .add('Show Grant Access dialog with perma spinner', () =>
    setupStorybookAnalytics(
      <GrantAccessBase {...defaultProps} spinnerActive continueButtonDisabled />
    )
  )
  .add('Show Grant Access dialog with 25% progress', () =>
    setupStorybookAnalytics(
      <GrantAccessBase {...defaultProps} analyticsId="growth.happy" progress={25} />
    )
  )
  .add('Show Grant Access dialog with 100% progress', () =>
    setupStorybookAnalytics(
      <GrantAccessBase {...defaultProps} analyticsId="growth.happy" progress={100} />
    )
  )
  .add(
    'Show Grant Access dialog with change users open and error state if failing to grant access',
    () =>
      setupStorybookAnalytics(
        <GrantAccessBase
          {...defaultProps}
          changeUsers
          defaultSelectedRadio="everyone"
          grantAccessToUsers={() => {
            console.log('grantAccessToUsers', ...arguments);
            return new Promise((_, reject) => setTimeout(reject, 1500));
          }}
        />
      )
  );
