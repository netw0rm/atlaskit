import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { ConfluenceLogo } from '@atlaskit/logo';

import { ConfirmRequestBase } from '../../../src/request-or-start-trial/components/ConfirmRequest';
import setupStorybookAnalytics from '../../helpers/setupStorybookAnalytics';

const defaultProps = {
  productLogo: <ConfluenceLogo />,
  image: 'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/kEL9zW2kcU8_U4Y_Rc1p3Zmm8J8Jq_JR0ikTg6cEWe8/Multi-Document.svg',
  heading: '[heading] Jira\'s perfect partner',
  message: '[message] Confluence helps your team create and collaborate on project documentation and it integrates perfectly with Jira.',

  cancelRequestTrial: action('cancelRequestTrial'),
  onComplete: action('onComplete'),
  onCancel: action('onCancel'),
};

storiesOf('request-or-start-trial/ConfirmRequest', module)
  .addDecorator(story => setupStorybookAnalytics(story()))
  .add('default', () =>
    <ConfirmRequestBase
      {...defaultProps}
    />
  )
  .add('already Requested', () =>
    <ConfirmRequestBase
      {...defaultProps}
      alreadyRequested
    />
  )
  .add('with custom messages', () =>
    <ConfirmRequestBase
      {...defaultProps}
      contextInfo={{
        contextualHeading: '[custom contextualHeading]',
        contextualMessage: '[custom contextualMessage]',
      }}
    />
  )
  .add('with custom messages - extreme length', () =>
    <ConfirmRequestBase
      {...defaultProps}
      contextInfo={{
        contextualHeading: '[custom contextualHeading] Lorem ipsum dolor amet Lorem ipsum dolor amet',
        contextualMessage: '[custom contextualMessage] Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      }}
    />
  );

