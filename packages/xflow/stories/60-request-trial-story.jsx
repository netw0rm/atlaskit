import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { ConfluenceLogo } from '@atlaskit/logo';

import { ConfirmRequestBase } from '../src/request-or-start-trial/components/ConfirmRequest';
import { RequestTrialNoteBase } from '../src/request-or-start-trial/components/RequestTrialNote';
import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import { INACTIVE } from '../src/common/productProvisioningStates';

const defaultProps = {
  alreadyRequested: false,
  productLogo: <ConfluenceLogo />,
  heading: 'Jira\'s perfect partner',
  message: 'Confluence helps your team create and collaborate on project documentation and it integrates perfectly with Jira.',
  image: 'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/kEL9zW2kcU8_U4Y_Rc1p3Zmm8J8Jq_JR0ikTg6cEWe8/Multi-Document.svg',
  prompt: 'Send a quick note telling your site admin why you\'re keen to try Confluence:',
  placeholder: 'Hi! I\'d like to try Confluence. It helps give the team more context on anything happening in Jira - and it\'s free for 30 days.',
  spinnerActive: false,
  status: INACTIVE,
  onComplete: () => {},
};

storiesOf('RequestTrial')
  .add('Request Trial (INACTIVE)', () =>
    setupStorybookAnalytics(
      <ConfirmRequestBase
        {...defaultProps}
        onComplete={() => Promise.resolve(true)}
        onCancel={() => Promise.resolve(true)}
      />
    )
  )
  .add('RequestTrialWithNote (INACTIVE), success flag after Send Note', () =>
    setupStorybookAnalytics(
      <RequestTrialNoteBase
        {...defaultProps}
        onComplete={() => Promise.resolve(true)}
        setProductRequestFlag={() => Promise.resolve()}
      />
    )
  )
  .add('RequestTrialWithNote (INACTIVE), error flag after Send Note', () =>
    setupStorybookAnalytics(
      <RequestTrialNoteBase
        {...defaultProps}
        requestTrialWithNote={
          () => new Promise((_, reject) =>
          setTimeout(() =>
          reject(new Error('It\'s borked')), 1500))}
        onComplete={() => Promise.resolve(true)}
      />
    )
  )
  .add('Already Requested Trial (INACTIVE)', () =>
  setupStorybookAnalytics(
    <ConfirmRequestBase
      {...defaultProps}
      onComplete={() => Promise.resolve(true)}
      onCancel={() => Promise.resolve(true)}
      alreadyRequested
    />
  )
);
