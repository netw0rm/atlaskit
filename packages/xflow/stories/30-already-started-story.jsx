import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { ConfluenceLogo } from '@atlaskit/logo';

import { AlreadyStartedBase } from '../src/request-or-start-trial/components/AlreadyStarted';
import setupStorybookAnalytics from './helpers/setupStorybookAnalytics';
import { ACTIVE, ACTIVATING } from '../src/common/productProvisioningStates';

const defaultProps = {
  productLogo: <ConfluenceLogo />,
  heading: 'You already have Confluece',
  message: (
    <div>
      <p>A site administrator already started a trial.</p>
      <p>You’re all set to create vital project documentation with your team.</p>
    </div>
  ),
  getStartedButtonText: 'Get started',
  spinnerActive: false,
  getStartedButtonDisabled: false,
  status: ACTIVATING,
  progress: 0,
  onComplete: () => {},
  goToProduct: action('ConfirmTrialBase goToProduct'),
};

storiesOf('request-or-start-trial/AlreadyStarted')
  .add('Already Started (ACTIVATING) progress bar (0%)', () =>
    setupStorybookAnalytics(
      <AlreadyStartedBase {...defaultProps} onComplete={() => Promise.resolve(true)} />
    )
  )
  .add('Already Started (ACTIVATING) progress bar (50%)', () =>
    setupStorybookAnalytics(
      <AlreadyStartedBase
        {...defaultProps}
        progress={0.5}
        onComplete={() => Promise.resolve(true)}
      />
    )
  )
  .add('Already Started (ACTIVATING Error) progress bar (100%)', () =>
    setupStorybookAnalytics(
      <AlreadyStartedBase
        {...defaultProps}
        progress={1}
        status={ACTIVATING}
        onComplete={() => Promise.resolve(true)}
      />
    )
  )
  .add('Already Started (ACTIVATING) progress bar (100%)', () =>
    setupStorybookAnalytics(
      <AlreadyStartedBase
        {...defaultProps}
        progress={1}
        initialStatus={ACTIVATING}
        status={ACTIVE}
        onComplete={() => Promise.resolve(true)}
      />
    )
  )
  .add('Already Started (ACTIVE)', () =>
    setupStorybookAnalytics(
      <AlreadyStartedBase
        {...defaultProps}
        progress={1}
        status={ACTIVE}
        onComplete={() => Promise.resolve(true)}
      />
    )
  );
