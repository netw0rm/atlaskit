import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { LoadingTimeBase } from '../src/request-or-start-trial/components/LoadingTime';

import { ConfluenceLogo } from '@atlaskit/logo';

import setupStorybookAnalytics from './helpers/setupStorybookAnalytics';

import { ACTIVE, ACTIVATING, UNKNOWN } from '../src/common/productProvisioningStates';

const noop = () => {};
const defaultProps = {
  onComplete: () => {},
  productLogo: <ConfluenceLogo />,
  heading: 'Where to find Confluence',
  message: 'Hit the menu icon near your profile image to switch between products.',
  gotoButton: 'Go to Confluence',
  goToProduct: noop,
  status: ACTIVATING,
  headerImage:
    'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/lmp9uitENIE2uALwP2L-0RptjRxiiDMe0atv8gRXyCs/loading_img.svg',
};

storiesOf('request-or-start-trial/LoadingTime')
  .add('Show Loading dialog', () =>
    setupStorybookAnalytics(<LoadingTimeBase {...defaultProps} progress={0} />)
  )
  .add('Show Loading dialog with 25% complete', () =>
    setupStorybookAnalytics(<LoadingTimeBase {...defaultProps} progress={0.25} />)
  )
  .add('Show Loading dialog when complete', () =>
    setupStorybookAnalytics(<LoadingTimeBase {...defaultProps} status={ACTIVE} progress={1} />)
  )
  .add('Show Loading dialog when timed out', () =>
    setupStorybookAnalytics(
      <LoadingTimeBase {...defaultProps} status={UNKNOWN} progress={1} confluenceTimedOut />
    )
  );
