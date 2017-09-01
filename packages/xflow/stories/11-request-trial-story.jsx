import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { ConfluenceLogo } from '@atlaskit/logo';

import { RequestTrialAccessBase } from '../src/request-or-start-trial/components/RequestTrialAccess';
import { RequestTrialNoteBase } from '../src/request-or-start-trial/components/RequestTrialNote';
import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import { INACTIVE } from '../src/common/productProvisioningStates';

const defaultProps = {
  productLogo: <ConfluenceLogo />,
  heading: 'JIRA Software\'s perfect partner',
  message: 'Create requirements and stay in sync with your team.',
  banner: 'https://placehold.it/352x214',
  prompt: 'Help your site administrator understand why you would like to use Confluence:',
  placeholder: 'I would like to try Confleunce because...',
  spinnerActive: false,
  status: INACTIVE,
  onComplete: () => {},
};

storiesOf('RequestTrial')
  .add('Request Trial (INACTIVE)', () =>
    setupStorybookAnalytics(
      <RequestTrialAccessBase {...defaultProps} onComplete={() => Promise.resolve(true)} />
    )
  )
  .add('RequestTrialWithNote (INACTIVE)', () =>
    setupStorybookAnalytics(
      <RequestTrialNoteBase {...defaultProps} onComplete={() => Promise.resolve(true)} />
    )
);
