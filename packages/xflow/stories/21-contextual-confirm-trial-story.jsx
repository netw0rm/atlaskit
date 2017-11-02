import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { ConfirmTrialBase } from '../src/request-or-start-trial/components/ContextualConfirmTrial';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import { INACTIVE, DEACTIVATED } from '../src/common/productProvisioningStates';

const defaultProps = {
  image: 'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/gzztkbTAQf3dfk3_iD9r4hu-ke0srRD9B6qCE4yZbqA/creating-content.svg',
  status: INACTIVE,
  trialHeading: 'Start your 30 day trial',
  trialMessage: (
    <p>
      Once your trial finishes, billing will start.<br />
      Easily cancel at anytime in <strong>Manage Application</strong>.<br />
      We will email your billing contact 3 days in advance.
    </p>
  ),
  reactivateHeading: 'Welcome back',
  reactivateMessage: (
    <div>
      <p>If your instance is eligible for a trial, Confluence will be free for 30 days.</p>
      <p>Otherwise, billing will start immediately.</p>
      <p>{"We'll email your billing contact 3 days prior to the due date with any new charges."}</p>
    </div>
  ),
  spinnerActive: false,
  getStartedButtonDisabled: false,
  onComplete: () => {},
  goToProduct: () => {
    console.log('Go to Confluence!');
  },
};

storiesOf('ContextualConfirmTrial')
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
