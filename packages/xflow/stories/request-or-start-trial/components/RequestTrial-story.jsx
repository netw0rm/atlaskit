import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { RequestTrialBase } from '../../../src/request-or-start-trial/components/RequestTrial';
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
  onComplete: action('onComplete'),
  onTrialRequested: action('onTrialRequested'),
};

XFLOW_PROVIDERS.reduce(
  (stories, { targetProductName, provider }) => {
    const MockXFlowProvider = mockXFlowProviderFactory(provider);

    return stories
      .add(`Jira to ${targetProductName}`, () => (
        <MockXFlowProvider requestTrialWithNote={action('callback: requestTrialWithNote')}>
          <RequestTrialBase
            {...defaultProps}
          />
        </MockXFlowProvider>
        ))
      .add(`Jira to ${targetProductName} - already requested`, () => (
        <MockXFlowProvider requestTrialWithNote={action('callback: requestTrialWithNote')}>
          <RequestTrialBase
            {...defaultProps}
            alreadyRequested
          />
        </MockXFlowProvider>
        ));
  },
  storiesOf('request-or-start-trial/RequestTrial', module)
  .addDecorator(story => setupStorybookAnalytics(story()))
);
