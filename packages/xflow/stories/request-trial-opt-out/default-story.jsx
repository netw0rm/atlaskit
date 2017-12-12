import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { RequestProductTrialOptOut } from '../../src';

import setupStorybookAnalytics from '../helpers/setupStorybookAnalytics';
import MockConfluenceXFlowProvider from '../helpers/MockConfluenceXFlowProvider';

const defaultProps = {
  canCurrentUserAddProduct: () => true,
  cancelOptOut: action('cancelOptOut'),
};

const defaultOptOutProps = {
  // onAnalyticsEvent: provided by setupStorybookAnalytics()
  sourceComponent: 'storybook-example-component',
  sourceContext: 'storybook-example-context',
  onComplete: () => Promise.resolve(true),
};

storiesOf('request-trial-opt-out/RequestProductTrialOptOut', module)
  .addDecorator(story => setupStorybookAnalytics(story()))
  .add('Opt Out Dialog', () =>
    <MockConfluenceXFlowProvider {...defaultProps}>
      <RequestProductTrialOptOut
        {...defaultOptOutProps}
        optOutRequestTrialFeature={() =>
            new Promise(resolve => setTimeout(resolve, 1000))
          }
      />
    </MockConfluenceXFlowProvider>
  )
  .add('Opt Out, error flag after failed request', () =>
    <MockConfluenceXFlowProvider {...defaultProps}>
      <RequestProductTrialOptOut
        {...defaultOptOutProps}
        optOutRequestTrialFeature={() =>
            new Promise((_, reject) =>
              setTimeout(() => reject({ message: 'Example failure' }), 1000))
          }
      />
    </MockConfluenceXFlowProvider>
  );
