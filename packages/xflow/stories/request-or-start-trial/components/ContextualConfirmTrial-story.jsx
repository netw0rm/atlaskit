import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { ConfirmTrialBase } from '../../../src/request-or-start-trial/components/ContextualConfirmTrial';

import setupStorybookAnalytics from '../../helpers/setupStorybookAnalytics';
import { INACTIVE, DEACTIVATED } from '../../../src/common/productProvisioningStates';

const defaultProps = {
  image: 'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/gzztkbTAQf3dfk3_iD9r4hu-ke0srRD9B6qCE4yZbqA/creating-content.svg',
  status: INACTIVE,
  spinnerActive: false,
  getStartedButtonDisabled: false,
  onComplete: () => {},
  goToProduct: action('ConfirmTrialBase goToProduct'),
  contextInfo: {
    contextualHeading: 'Project pages are powered by Confluence',
    contextualMessage: 'Create, share, and collaborate on all your project docs in one place, with Confluence pages.',
    reactivateCTA: 'Reactivate Confluence',
    trialCTA: 'Try Confluence free for 30 days',
  },
};

storiesOf('request-or-start-trial/ContextualConfirmTrial')
  .add('Confirm Trial dialog (INACTIVE)', () =>
    setupStorybookAnalytics(
      <ConfirmTrialBase
        {...defaultProps}
        onComplete={() => Promise.resolve(true)}
        onCancel={() => Promise.resolve(true)}
      />
    )
  )
  .add('Confirm Trial dialog (INACTIVE) with custom contextual image', () =>
    setupStorybookAnalytics(
      <ConfirmTrialBase
        {...defaultProps}
        onComplete={() => Promise.resolve(true)}
        onCancel={() => Promise.resolve(true)}
        contextInfo={{
          contextualImage: 'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/kEL9zW2kcU8_U4Y_Rc1p3Zmm8J8Jq_JR0ikTg6cEWe8/Multi-Document.svg',
          contextualHeading: 'Project pages are powered by Confluence',
          contextualMessage: 'Create, share, and collaborate on all your project docs in one place, with Confluence pages.',
          reactivateCTA: 'Reactivate Confluence',
          trialCTA: 'Try Confluence free for 30 days',
        }}
      />
    )
  )
  .add('Confirm Trial dialog (INACTIVE) with spinner', () =>
    setupStorybookAnalytics(
      <ConfirmTrialBase
        {...defaultProps}
        onComplete={() => Promise.resolve(true)}
        onCancel={() => Promise.resolve(true)}
        spinnerActive
        buttonsDisabled
      />
    )
  )
  .add('Confirm Trial dialog (INACTIVE), Error flag after Confirm', () =>
    setupStorybookAnalytics(
      <ConfirmTrialBase
        {...defaultProps}
        startProductTrial={() => new Promise((_, reject) => setTimeout(reject, 1500))}
        onComplete={() => Promise.resolve()}
        onCancel={() => Promise.resolve()}
      />
    )
  )
  .add('Confirm Trial dialog (DEACTIVATED)', () =>
    setupStorybookAnalytics(
      <ConfirmTrialBase
        {...defaultProps}
        status={DEACTIVATED}
        onComplete={() => Promise.resolve(true)}
        onCancel={() => Promise.resolve(true)}
      />
    )
  )
  .add('Confirm Trial dialog (DEACTIVATED) with spinner', () =>
    setupStorybookAnalytics(
      <ConfirmTrialBase
        {...defaultProps}
        status={DEACTIVATED}
        onComplete={() => Promise.resolve(true)}
        onCancel={() => Promise.resolve(true)}
        spinnerActive
        buttonsDisabled
      />
    )
  )
  .add('Confirm Trial dialog (DEACTIVATED), Error flag after Confirm', () =>
    setupStorybookAnalytics(
      <ConfirmTrialBase
        {...defaultProps}
        status={DEACTIVATED}
        startProductTrial={() => new Promise((_, reject) => setTimeout(reject, 1500))}
        onComplete={() => Promise.resolve()}
        onCancel={() => Promise.resolve()}
      />
    )
  );
