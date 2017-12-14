import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { ContextualStartTrialBase } from '../../../src/request-or-start-trial/components/ContextualStartTrial';
import JiraToConfluenceXFlowProvider from '../../../src/product-xflow-providers/JiraToConfluenceXFlowProvider';
import JiraToJSDXFlowProvider from '../../../src/product-xflow-providers/JiraToJSDXFlowProvider';
import JiraToJSWXFlowProvider from '../../../src/product-xflow-providers/JiraToJSWXFlowProvider';
import JiraToJCXFlowProvider from '../../../src/product-xflow-providers/JiraToJCXFlowProvider';

import mockXFlowProviderFactory from '../../helpers/mockXFlowProviderFactory';
import setupStorybookAnalytics from '../../helpers/setupStorybookAnalytics';

const XFLOW_PROVIDERS = [
  {
    targetProductName: 'Confluence',
    provider: JiraToConfluenceXFlowProvider,
  },
  {
    targetProductName: 'JiraServiceDesk',
    provider: JiraToJSDXFlowProvider,
  },
  {
    targetProductName: 'JiraSoftware',
    provider: JiraToJSWXFlowProvider,
  },
  {
    targetProductName: 'JiraCore',
    provider: JiraToJCXFlowProvider,
  },
];

const defaultProps = {
  showGrantAccess: false,

  contextInfo: {
    contextualImage: 'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/kEL9zW2kcU8_U4Y_Rc1p3Zmm8J8Jq_JR0ikTg6cEWe8/Multi-Document.svg',
    contextualHeading: 'Heading Lorem ipsum',
    contextualMessage: 'Message Lorem Ipsum..',
    reactivateCTA: 'Reactivate X',
    trialCTA: 'Try X free for 30 days',
  },

  onComplete: action('onComplete'),
  onTrialActivating: action('onTrialActivating'),
};

XFLOW_PROVIDERS.reduce(
  (stories, { targetProductName, provider }) => {
    const MockXFlowProvider = mockXFlowProviderFactory(provider);

    return stories
      .add(`Jira to ${targetProductName}`, () => (
        <MockXFlowProvider
          cancelStartProductTrial={action('cancelStartProductTrial')}
        >
          <ContextualStartTrialBase
            {...defaultProps}
          />
        </MockXFlowProvider>
        ));
  },
  storiesOf('request-or-start-trial/ContextualStartTrialBase', module)
  .addDecorator(story => setupStorybookAnalytics(story()))
);
