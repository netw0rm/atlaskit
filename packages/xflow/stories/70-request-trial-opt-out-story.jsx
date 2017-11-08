import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { RequestProductTrialOptOut } from '@atlaskit/xflow';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import MockConfluenceXFlowProvider from './providers/MockConfluenceXFlowProvider';

const defaultProps = {
  canCurrentUserAddProduct: async () => true,
  cancelOptOut: async () => {},
};

const defaultOptOutProps = {
  onAnalyticsEvent: action('onAnalyticsEvent'),
  sourceComponent: 'storybook-example-compontent',
  sourceContext: 'storybook-example-context',
  onComplete: () => Promise.resolve(true),
};

storiesOf('RequestProductTrialOptOut')
  .add('Opt Out Dialog', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlowProvider {...defaultProps}>
        <RequestProductTrialOptOut
          {...defaultOptOutProps}
          optOutRequestTrialFeature={() =>
            new Promise(resolve => setTimeout(resolve, 1000)
          )}
        />
      </MockConfluenceXFlowProvider>
    )
  )
  .add('Opt Out, error flag after failed request', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlowProvider {...defaultProps}>
        <RequestProductTrialOptOut
          {...defaultOptOutProps}
          optOutRequestTrialFeature={() =>
            new Promise((_, reject) =>
              setTimeout(() => reject({ message: 'Example failure' }), 1000)
            )}
        />
      </MockConfluenceXFlowProvider>
    )
  );
