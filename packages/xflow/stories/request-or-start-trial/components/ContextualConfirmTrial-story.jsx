import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { ContextualConfirmTrialBase } from '../../../src/request-or-start-trial/components/ContextualConfirmTrial';

import setupStorybookAnalytics from '../../helpers/setupStorybookAnalytics';
import { INACTIVE, DEACTIVATED } from '../../../src/common/productProvisioningStates';

const defaultProps = {
  image: 'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/gzztkbTAQf3dfk3_iD9r4hu-ke0srRD9B6qCE4yZbqA/creating-content.svg',
  contextInfo: {
    contextualHeading: 'Project pages are powered by Confluence',
    contextualMessage: 'Create, share, and collaborate on all your project docs in one place, with Confluence pages.',
    reactivateCTA: 'Reactivate Confluence',
    trialCTA: 'Try Confluence free for 30 days',
  },
  spinnerActive: false,
  buttonsDisabled: false,
  status: INACTIVE,

  onComplete: action('onComplete'),
  onCancel: action('onCancel'),
  startProductTrial: action('startProductTrial'),
  cancelStartProductTrial: action('cancelStartProductTrial'),
};

storiesOf('request-or-start-trial/ContextualConfirmTrial', module)
  .addDecorator(story => setupStorybookAnalytics(story()))
  .add('Confirm Trial dialog (INACTIVE)', () =>
    <ContextualConfirmTrialBase
      {...defaultProps}
    />
  )
  .add('Confirm Trial dialog (INACTIVE) with custom contextual image', () =>
    <ContextualConfirmTrialBase
      {...defaultProps}
      contextInfo={{
        contextualImage: 'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/kEL9zW2kcU8_U4Y_Rc1p3Zmm8J8Jq_JR0ikTg6cEWe8/Multi-Document.svg',
        contextualHeading: 'Project pages are powered by Confluence',
        contextualMessage: 'Create, share, and collaborate on all your project docs in one place, with Confluence pages.',
        reactivateCTA: 'Reactivate Confluence',
        trialCTA: 'Try Confluence free for 30 days',
      }}
    />
  )
  .add('Confirm Trial dialog (INACTIVE) with spinner', () =>
    <ContextualConfirmTrialBase
      {...defaultProps}
      spinnerActive
      buttonsDisabled
    />
  )
  .add('Confirm Trial dialog (INACTIVE), Error flag after Confirm', () =>
    <ContextualConfirmTrialBase
      {...defaultProps}
      startProductTrial={() => new Promise((_, reject) => setTimeout(reject, 1500))}
    />
  )
  .add('Confirm Trial dialog (DEACTIVATED)', () =>
    <ContextualConfirmTrialBase
      {...defaultProps}
      status={DEACTIVATED}
    />
  )
  .add('Confirm Trial dialog (DEACTIVATED) with spinner', () =>
    <ContextualConfirmTrialBase
      {...defaultProps}
      status={DEACTIVATED}
      spinnerActive
      buttonsDisabled
    />
  )
  .add('Confirm Trial dialog (DEACTIVATED), Error flag after Confirm', () =>
    <ContextualConfirmTrialBase
      {...defaultProps}
      status={DEACTIVATED}
      startProductTrial={() => new Promise((_, reject) => setTimeout(reject, 1500))}
    />
  );
