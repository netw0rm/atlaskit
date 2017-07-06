import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { LoadingTimeBase } from '../src/start-trial/components/LoadingTime';

import { ConfluenceLogo } from '@atlaskit/logo';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';

const defaultProps = {
  onComplete: () => {},
  productLogo: <ConfluenceLogo />,
  heading: 'You are almost there...',
  completeHeading: 'Confluence is ready my friend!',
};

storiesOf('StartTrialLoading')
  .add('Show Loading dialog', () =>
    setupStorybookAnalytics(
      <LoadingTimeBase {...defaultProps} analyticsId="growth.happy" progress={0} />
    )
  )
  .add('Show Loading dialog with 25% complete', () =>
    setupStorybookAnalytics(
      <LoadingTimeBase {...defaultProps} analyticsId="growth.happy" progress={25} />
    )
  )
  .add('Show Loading dialog when complete', () =>
    setupStorybookAnalytics(
      <LoadingTimeBase {...defaultProps} analyticsId="growth.happy" progress={100} />
    )
  );
