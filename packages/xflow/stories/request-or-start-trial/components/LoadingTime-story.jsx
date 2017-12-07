import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { LoadingTimeBase } from '../../../src/request-or-start-trial/components/LoadingTime';

import { ConfluenceLogo } from '@atlaskit/logo';

import setupStorybookAnalytics from '../../helpers/setupStorybookAnalytics';

import { ACTIVE, ACTIVATING, UNKNOWN } from '../../../src/common/productProvisioningStates';

const defaultProps = {
  status: ACTIVATING,
  productLogo: <ConfluenceLogo />,
  heading: 'Where to find Confluence',
  message: 'Hit the menu icon near your profile image to switch between products.',
  gotoButton: 'Go to Confluence',
  headerImage:
    'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/lmp9uitENIE2uALwP2L-0RptjRxiiDMe0atv8gRXyCs/loading_img.svg',

  onComplete: action('onComplete'),
  closeLoadingDialog: action('closeLoadingDialog'),
  goToProduct: action('goToProduct'),
};

storiesOf('request-or-start-trial/LoadingTime', module)
  .addDecorator(story => setupStorybookAnalytics(story()))
  .add('Show Loading dialog', () =>
    <LoadingTimeBase {...defaultProps} progress={0} />
  )
  .add('Show Loading dialog with 25% complete', () =>
    <LoadingTimeBase {...defaultProps} progress={0.25} />
  )
  .add('Show Loading dialog when complete', () =>
    <LoadingTimeBase {...defaultProps} status={ACTIVE} progress={1} />
  )
  .add('Show Loading dialog when timed out', () =>
    <LoadingTimeBase {...defaultProps} status={UNKNOWN} progress={1} confluenceTimedOut />
  );
