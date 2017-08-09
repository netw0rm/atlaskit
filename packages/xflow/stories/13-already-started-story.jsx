import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { ConfluenceLogo } from '@atlaskit/logo';

import { AlreadyStartedBase } from '../src/start-trial/components/AlreadyStarted';
import setupStorybookAnalytics from './util/setupStorybookAnalytics';
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
  onComplete: () => {},
  goToProduct: () => {
    console.log('Go to Confluence!');
  },
};

storiesOf('AlreadyStarted')
  .add('Show Already Have Product Trial dialog with progress bar', () =>
    setupStorybookAnalytics(
      <AlreadyStartedBase
        {...defaultProps}
        onComplete={() => Promise.resolve(true)}
      />
    )
  )
  .add('Show Loading dialog when product is ready', () =>
    setupStorybookAnalytics(
      <AlreadyStartedBase
        {...defaultProps}
        status={ACTIVE}
      />
    )
  );
