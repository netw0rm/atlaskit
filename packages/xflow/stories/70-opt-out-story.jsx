import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import OptOut from '../src/opt-out';
import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import MockConfluenceXFlowProvider from './providers/MockConfluenceXFlowProvider';

const defaultProps = {
  canCurrentUserAddProduct: async () => true,
  optOutRequestTrialFeature: () => new Promise(resolve => setTimeout(resolve, 1000)),
  cancelOptOut: async () => {},
};

const defaultOptOutProps = {
  onAnalyticsEvent: action('onAnalyticsEvent'),
  sourceComponent: 'storybook-example-compontent',
  sourceContext: 'storybook-example-context',
};

storiesOf('Opt Out').add('Opt Out Dialog', () =>
  setupStorybookAnalytics(
    <MockConfluenceXFlowProvider {...defaultProps}>
      <OptOut {...defaultOptOutProps} />
    </MockConfluenceXFlowProvider>
  )
);
