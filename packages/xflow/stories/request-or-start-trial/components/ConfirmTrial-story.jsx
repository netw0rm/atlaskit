import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import { ConfluenceLogo } from '@atlaskit/logo';

import { ConfirmTrialBase } from '../../../src/request-or-start-trial/components/ConfirmTrial';

import setupStorybookAnalytics from '../../helpers/setupStorybookAnalytics';
import { INACTIVE, DEACTIVATED } from '../../../src/common/productProvisioningStates';

const defaultProps = {
  productLogo: <ConfluenceLogo />,
  status: INACTIVE,
  trialHeading: 'Start your 30 day trial',
  trialMessage: (
    <p>
      Once your trial finishes, billing will start.<br />
      Easily cancel at anytime in <strong>Manage subscriptions</strong>.<br />
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

  startProductTrial: action('startProductTrial'),
  cancelStartProductTrial: action('cancelStartProductTrial'),
  onComplete: action('onComplete'),
  onCancel: action('onCancel'),
};

storiesOf('request-or-start-trial/ConfirmTrial', module)
  .addDecorator(story => setupStorybookAnalytics(story()))
  .add('Confirm Trial dialog (INACTIVE)', () =>
    <ConfirmTrialBase
      {...defaultProps}
    />
  )
  .add('Confirm Trial dialog (INACTIVE) with spinner', () =>
    <ConfirmTrialBase
      {...defaultProps}
      spinnerActive
      buttonsDisabled
    />
  )
  .add('Confirm Trial dialog (INACTIVE), Error flag after Confirm', () =>
    <ConfirmTrialBase
      {...defaultProps}
      startProductTrial={() => new Promise((_, reject) => setTimeout(reject, 1500))}
    />
  )
  .add('Confirm Trial dialog (DEACTIVATED)', () =>
    <ConfirmTrialBase
      {...defaultProps}
      status={DEACTIVATED}
    />
  )
  .add('Confirm Trial dialog (DEACTIVATED) with spinner', () =>
    <ConfirmTrialBase
      {...defaultProps}
      status={DEACTIVATED}
      spinnerActive
      buttonsDisabled
    />
  )
  .add('Confirm Trial dialog (DEACTIVATED), Error flag after Confirm', () =>
    <ConfirmTrialBase
      {...defaultProps}
      status={DEACTIVATED}
      startProductTrial={() => new Promise((_, reject) => setTimeout(reject, 1500))}
    />
  );
