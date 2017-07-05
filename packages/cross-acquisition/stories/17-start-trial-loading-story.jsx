import { storiesOf } from '@kadira/storybook';
import React from 'react';

import LoadingTime from '../src/start-trial/components/LoadingTime';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import MockConfluenceCrossSell from './providers/MockConfluenceCrossSellProvider';

storiesOf('StartTrialLoading')
  .add('Show Loading dialog', () => setupStorybookAnalytics(
    <MockConfluenceCrossSell canCurrentUserAddProduct={() => Promise.resolve(true)}>
      <LoadingTime analyticsId="growth.happy" onComplete={() => Promise.resolve(true)} />
    </MockConfluenceCrossSell>
    )
  )
  .add('Show Loading dialog with 25% complete', () => setupStorybookAnalytics(
    <MockConfluenceCrossSell canCurrentUserAddProduct={() => Promise.resolve(true)}>
      <LoadingTime analyticsId="growth.happy" progress={25} onComplete={() => Promise.resolve(true)} />
    </MockConfluenceCrossSell>
    )
  )
  .add('Show Loading dialog with 100% complete', () => setupStorybookAnalytics(
    <MockConfluenceCrossSell canCurrentUserAddProduct={() => Promise.resolve(true)}>
      <LoadingTime analyticsId="growth.happy" progress={100} onComplete={() => Promise.resolve(true)} />
    </MockConfluenceCrossSell>
    )
  );
