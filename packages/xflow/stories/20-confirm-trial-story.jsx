import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';

import { ConfirmTrialBase } from '../src/request-or-start-trial/components/ConfirmTrial';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import { INACTIVE, DEACTIVATED } from '../src/common/productProvisioningStates';

const defaultProps = {
  productLogo: <ConfluenceLogo />,
  status: INACTIVE,
  trialHeading: 'Start your 30 day trial',
  trialMessage: (
    <p>
      Once your trial finishes, billing will start.<br />
      Easily cancel at anytime in <strong>Manage Application</strong>.<br />
      We will email your billing contact 3 days in advance.
    </p>
  ),
  reactivateHeading: '[PLACEHOLDER] Reactivate Confluence',
  reactivateMessage: (
    <p>
      [PLACEHOLDER] Once your trial finishes, billing will start.<br />
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
  .add('Confirm Trial dialog (INACTIVE)', () =>
    setupStorybookAnalytics(
      <ConfirmTrialBase
        {...defaultProps}
        onComplete={() => Promise.resolve(true)}
        onCancel={() => Promise.resolve(true)}
      />
    )
  )
  .add('Confirm Trial dialog (INACTIVE) with spinner', () =>
    setupStorybookAnalytics(
      <ConfirmTrialBase
        {...defaultProps}
        onComplete={() => Promise.resolve(true)}
        onCancel={() => Promise.resolve(true)}
        spinnerActive
        buttonsDisabled
      />
    )
  )
  .add('Confirm Trial dialog (INACTIVE), Error flag after Confirm', () =>
    setupStorybookAnalytics(
      <ConfirmTrialBase
        {...defaultProps}
        startProductTrial={() => new Promise((_, reject) => setTimeout(reject, 1500))}
        onComplete={() => Promise.resolve()}
        onCancel={() => Promise.resolve()}
      />
    )
  )
  .add('Confirm Trial dialog (DEACTIVATED)', () =>
    setupStorybookAnalytics(
      <ConfirmTrialBase
        {...defaultProps}
        status={DEACTIVATED}
        onComplete={() => Promise.resolve(true)}
        onCancel={() => Promise.resolve(true)}
      />
    )
  )
  .add('Confirm Trial dialog (DEACTIVATED) with spinner', () =>
    setupStorybookAnalytics(
      <ConfirmTrialBase
        {...defaultProps}
        status={DEACTIVATED}
        onComplete={() => Promise.resolve(true)}
        onCancel={() => Promise.resolve(true)}
        spinnerActive
        buttonsDisabled
      />
    )
  )
  .add('Confirm Trial dialog (DEACTIVATED), Error flag after Confirm', () =>
    setupStorybookAnalytics(
      <ConfirmTrialBase
        {...defaultProps}
        status={DEACTIVATED}
        startProductTrial={() => new Promise((_, reject) => setTimeout(reject, 1500))}
        onComplete={() => Promise.resolve()}
        onCancel={() => Promise.resolve()}
      />
    )
  );
