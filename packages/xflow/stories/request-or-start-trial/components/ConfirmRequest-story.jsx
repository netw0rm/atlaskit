import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { ConfluenceLogo } from '@atlaskit/logo';

import { ConfirmRequestBase } from '../../../src/request-or-start-trial/components/ConfirmRequest';
import setupStorybookAnalytics from '../../helpers/setupStorybookAnalytics';

const defaultProps = {
  productLogo: <ConfluenceLogo />,
  heading: '[heading] Jira\'s perfect partner',
  message: '[message] Confluence helps your team create and collaborate on project documentation and it integrates perfectly with Jira.',
  image: 'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/kEL9zW2kcU8_U4Y_Rc1p3Zmm8J8Jq_JR0ikTg6cEWe8/Multi-Document.svg',
  onComplete: async () => true,
  onCancel: async () => true,
};

storiesOf('request-or-start-trial/ConfirmRequest')
  .add('default', () =>
    setupStorybookAnalytics(
      <ConfirmRequestBase
        {...defaultProps}
      />
    )
  )
  .add('already Requested', () =>
    setupStorybookAnalytics(
      <ConfirmRequestBase
        {...defaultProps}
        alreadyRequested
      />
    )
  )
  .add('with custom messages', () =>
    setupStorybookAnalytics(
      <ConfirmRequestBase
        {...defaultProps}
        contextInfo={{
          contextualHeading: '[custom contextualHeading]',
          contextualMessage: '[custom contextualMessage]',
        }}
      />
    )
  )
  .add('with custom messages - extreme length', () =>
    setupStorybookAnalytics(
      <ConfirmRequestBase
        {...defaultProps}
        contextInfo={{
          contextualHeading: '[custom contextualHeading] Lorem ipsum dolor amet Lorem ipsum dolor amet',
          contextualMessage: '[custom contextualMessage] Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        }}
      />
    )
  );

