import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { ConfluenceLogo } from '@atlaskit/logo';

import { RequestAccessBase } from '../src/request-or-start-trial/components/RequestAccess';
import { RequestAccessNoteBase } from '../src/request-or-start-trial/components/RequestAccessNote';
import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import { INACTIVE } from '../src/common/productProvisioningStates';

const defaultProps = {
  productLogo: <ConfluenceLogo />,
  heading: 'JIRA\'s perfect partner',
  message: 'Create requirements and stay in sync with your entire team.',
  banner: 'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/thLml1VMBT-bGkv2iO-2h5g2ZQLA0ivTS_mSX2zaHJc/ConfluenceRequestAccess.svg',
  prompt: 'Help your site administrator understand why you would like to use Confluence:',
  placeholder: 'I would like to try Confluence because...',
  spinnerActive: false,
  status: INACTIVE,
  onComplete: () => {},
};

storiesOf('RequestTrial')
  .add('Request Trial (INACTIVE)', () =>
    setupStorybookAnalytics(
      <RequestAccessBase {...defaultProps} onComplete={() => Promise.resolve(true)} />
    )
  )
  .add('RequestTrialWithNote (INACTIVE)', () =>
    setupStorybookAnalytics(
      <RequestAccessNoteBase {...defaultProps} onComplete={() => Promise.resolve(true)} />
    )
);
