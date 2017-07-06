import { storiesOf } from '@kadira/storybook';
import React from 'react';

import ConfirmTrial from '../src/start-trial/components/ConfirmTrial';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import MockConfluenceCrossSell from './providers/MockConfluenceCrossSellProvider';

storiesOf('StartTrialConfirm')
  .add('Show Confirm Trial dialog', () => setupStorybookAnalytics(
    <MockConfluenceCrossSell canCurrentUserAddProduct={() => Promise.resolve(true)}>
      <ConfirmTrial analyticsId="growth.happy" onComplete={() => Promise.resolve(true)} />
    </MockConfluenceCrossSell>
  )
  )
  .add('Show Confirm Trial dialog with perma spinner', () => setupStorybookAnalytics(
    <MockConfluenceCrossSell canCurrentUserAddProduct={() => Promise.resolve(true)}>
      <ConfirmTrial analyticsId="growth.happy" onComplete={() => Promise.resolve(true)} spinnerActive confirmButtonDisabled />
    </MockConfluenceCrossSell>
  )
  );
