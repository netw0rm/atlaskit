import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import { RequestOrStartTrial } from '../../src';

import setupStorybookAnalytics from '../helpers/setupStorybookAnalytics';
import mockXFlowProviderFactory from '../helpers/mockXFlowProviderFactory';

import GenericXFlowProviderFactory from '../../src/product-xflow-providers/genericXFlowProviderFactory';

const defaultXFlowProviderProps = {
  canCurrentUserAddProduct: () => true,

  cancelStartProductTrial: action('mock cancelStartProductTrial'),
  goToProduct: action('mock goToProduct'),
  closeLoadingDialog: action('mock closeLoadingDialog'),

  cancelRequestTrial: action('mock cancelRequestTrial'),
  checkProductRequestFlag: action('mock checkProductRequestFlag'),
  setProductRequestFlag: action('mock setProductRequestFlag'),
};

const defaultRequestOrStartTrialProps = {
  // onAnalyticsEvent: provided by setupStorybookAnalytics()
  sourceComponent: 'storybook-example-component',
  sourceContext: 'storybook-example-context',
  targetProduct: 'storybook-example-product',
};

const NonJiraProvider = mockXFlowProviderFactory(GenericXFlowProviderFactory('NOT-JIRA', {
  config: {
    productLogo: <span>NOT JIRA!</span>,
    startTrial: {
      loadingProductGotoProductButton: 'Launch!',
    },
  },
}));

const JiraProvider = mockXFlowProviderFactory(GenericXFlowProviderFactory('jira-core.ondemand', {
  config: {
    productLogo: <span>NOT JIRA!</span>,
    startTrial: {
      loadingProductGotoProductButton: 'Launch!',
    },
  },
}));

storiesOf('BUX', module)
  .addDecorator(story => setupStorybookAnalytics(story()))
  .add('random product', () =>
    <NonJiraProvider
      {...defaultXFlowProviderProps}

    >
      <RequestOrStartTrial
        {...defaultRequestOrStartTrialProps}
        onTrialActivating={action('onTrialActivating')}
        grantAccessEnabled={false}
        isCrossSell
      />
    </NonJiraProvider>
  )
  .add('Jira', () =>
    <JiraProvider
      {...defaultXFlowProviderProps}

    >
      <RequestOrStartTrial
        {...defaultRequestOrStartTrialProps}
        onTrialActivating={action('onTrialActivating')}
        grantAccessEnabled={false}
        isCrossSell
      />
    </JiraProvider>
  );

