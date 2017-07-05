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
  selectedRadio: 'everyone',
  heading: 'Who should have access?',
  defaultAccess: (
    <p><strong>Everyone in JIRA Software</strong> will have access to Confluence.</p>
  ),
  learnMoreLinkText: 'Learn more',
  notifyUsers: 'Notify these users',
  optionItems: [
    {
      value: 'everyone',
      label: 'Everyone in JIRA Software',
    },
    {
      value: 'siteAdmins',
      label: 'Site admins only',
    },
    {
      value: 'specificUsers',
      label: 'Specific users',
    },
  ],
  userSelectPlaceholder: 'Start typing a username',
  usersOption: 'specificUsers',
  chooseOption: 'Choose an option',
  affectBill: 'How will this affect my bill?',
};

storiesOf('GrantAccess')
  .add('Show Grant Access dialog', () =>
    setupStorybookAnalytics(
      <GrantAccessBase {...defaultProps} analyticsId="growth.happy" />
    )
  )
  .add('Show Grant Access dialog with change users open', () =>
    setupStorybookAnalytics(
      <GrantAccessBase
        {...defaultProps}
        analyticsId="growth.happy"
        changeUsers
        selectedRadio="everyone"
      />
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
  .add('Show Grant Access dialog error state no specific users selected', () =>
    setupStorybookAnalytics(
      <GrantAccessBase
        {...defaultProps}
        analyticsId="growth.happy"
        changeUsers
        selectedRadio="specificUsers"
        userSelectInFocus
        userSelectIsInvalid
      />
    )
  );
