import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';

import { GrantAccessBase } from '../src/start-trial/components/GrantAccess';
import setupStorybookAnalytics from './util/setupStorybookAnalytics';

import { ACTIVE, ACTIVATING } from '../src/common/productProvisioningStates';

const defaultProps = {
  productLogo: <ConfluenceLogo />,
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
  // selectLabel: 'Select users',
  defaultSelectedRadio: 'everyone',
  progress: 0,
  status: ACTIVATING,
  heading: 'Who should have access?',
  defaultAccess: 'Everyone in JIRA will have access to Confluence.',

  userSelectInFocus: false,
  userSelectIsInvalid: false,
  changeUsers: false,
  spinnerActive: false,
  continueButtonDisabled: false,

  grantAccessToUsers: async (...args) => {
    console.log('grantAccessToUsers', ...args);
  },

  retrieveUsers: () =>
    Promise.resolve([
      { name: 'lhunt', 'display-name': 'Lachlan Hunt', email: 'lhunt@example.com' },
      { name: 'awakeling', 'display-name': 'Andrew Wakeling', email: 'awakeling@example.com' },
      { name: 'ahammond', 'display-name': 'Andrew Hammond', email: 'ahammond@example.com' },
      { name: 'mtruong', 'display-name': 'Michael Truong', email: 'mtruong@example.com' },
      { name: 'gburrows', 'display-name': 'George Burrows', email: 'gburrows@example.com' },
    ]),

  goToLearnMore: () => {
    console.log('Go to Learn More!');
  },

  onComplete: () => {
    console.log('GrantAccessToUsers onComplete called');
  },
};

storiesOf('GrantAccess')
  .add('Grant Access dialog', () =>
    setupStorybookAnalytics(<GrantAccessBase {...defaultProps} analyticsId="growth.happy" />)
  )
  .add('Grant Access dialog, Change... ("everyone" selected)', () =>
    setupStorybookAnalytics(
      <GrantAccessBase
        {...defaultProps}
        analyticsId="growth.happy"
        changeUsers
        defaultSelectedRadio="everyone"
      />
    )
  )
  .add('Grant Access dialog, Change... ("site-admins" selected)', () =>
    setupStorybookAnalytics(
      <GrantAccessBase {...defaultProps} changeUsers defaultSelectedRadio="site-admins" />
    )
  )
  .add('Grant Access dialog, Change... ("specific-users" selected)', () =>
    setupStorybookAnalytics(
      <GrantAccessBase
        {...defaultProps}
        changeUsers
        defaultSelectedRadio="specific-users"
        userSelectInFocus
      />
    )
  )
  .add('Grant Access dialog, Change... ("specific-users" selected, error)', () =>
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
    setupStorybookAnalytics(
      <GrantAccessBase {...defaultProps} analyticsId="growth.happy" progress={0.25} />
    )
  )
  .add('Grant Access dialog (ACTIVATING Error) progress bar (100%)', () =>
    setupStorybookAnalytics(
      <GrantAccessBase {...defaultProps} analyticsId="growth.happy" progress={1} />
    )
  )
  .add('Grant Access dialog (ACTIVE) progress bar (100%)', () =>
    setupStorybookAnalytics(
      <GrantAccessBase {...defaultProps} analyticsId="growth.happy" progress={1} status={ACTIVE} />
    )
  )
  .add('Grant Access dialog, Change... Error flag after Continue', () =>
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
