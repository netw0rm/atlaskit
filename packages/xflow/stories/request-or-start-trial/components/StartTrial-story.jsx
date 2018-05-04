import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { StartTrialBase } from '../../../src/request-or-start-trial/components/StartTrial';
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
          <StartTrialBase
            {...defaultProps}
          />
        </MockXFlowProvider>
        ));
  },
  storiesOf('request-or-start-trial/[internal path 1] StartTrial', module)
  .addDecorator(story => setupStorybookAnalytics(story()))
);
