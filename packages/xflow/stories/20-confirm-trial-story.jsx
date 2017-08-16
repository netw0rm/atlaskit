import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';

import { ConfirmTrialBase } from '../src/start-trial/components/ConfirmTrial';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';

const defaultProps = {
  productLogo: <ConfluenceLogo />,
  heading: 'Start your 30 day trial',
  message: (
    <p>
      Once your trial finishes, billing will start.<br />
      Easily cancel at anytime in <strong>Manage Application</strong>.<br />
      We will email your billing contact 3 days in advance.
    </p>
  ),
  spinnerActive: false,
  getStartedButtonDisabled: false,
  onComplete: () => {},
  goToProduct: () => {
    console.log('Go to Confluence!');
  },
};

storiesOf('ConfirmTrial')
  .add('Confirm Trial dialog', () =>
    setupStorybookAnalytics(
      <ConfirmTrialBase
        {...defaultProps}
        analyticsId="growth.happy"
        onComplete={() => Promise.resolve(true)}
        onCancel={() => Promise.resolve(true)}
      />
    )
  )
  .add('Confirm Trial dialog with spinner', () =>
    setupStorybookAnalytics(
      <ConfirmTrialBase
        {...defaultProps}
        analyticsId="growth.happy"
        onComplete={() => Promise.resolve(true)}
        onCancel={() => Promise.resolve(true)}
        spinnerActive
        confirmButtonDisabled
      />
    )
  )
  .add('Confirm Trial dialog, Error flag after Confirm', () =>
    setupStorybookAnalytics(
      <ConfirmTrialBase
        {...defaultProps}
        analyticsId="growth.happy"
        startProductTrial={() => new Promise((_, reject) => setTimeout(reject, 1500))}
        onComplete={() => Promise.resolve()}
        onCancel={() => Promise.resolve()}
      />
    )
  );
