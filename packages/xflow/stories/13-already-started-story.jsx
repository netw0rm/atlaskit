import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { AlreadyStartedBase } from '../src/start-trial/components/AlreadyStarted';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';

import { ConfluenceLogo } from '@atlaskit/logo';

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
  onComplete: () => {},
  goToProduct: () => {
    console.log('Go to Confluence!');
  },
};

storiesOf('AlreadyStarted')
  .add('Show Already Have Product Trial dialog', () =>
    setupStorybookAnalytics(
      <AlreadyStartedBase
        {...defaultProps}
        analyticsId="growth.happy"
        onComplete={() => Promise.resolve(true)}
      />
    )
  )
  .add('Show Already Have Product Trial dialog with perma spinner', () =>
    setupStorybookAnalytics(
      <AlreadyStartedBase
        {...defaultProps}
        analyticsId="growth.happy"
        spinnerActive
        getStartedButtonDisabled
      />
    )
  );
