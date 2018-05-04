import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { XFlowOptOut } from '../../src';

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

storiesOf('xflow-opt-out/XFlowOptOut', module)
  .addDecorator(story => setupStorybookAnalytics(story()))
  .add('Opt Out Dialog', () =>
    <MockConfluenceXFlowProvider {...defaultProps}>
      <XFlowOptOut
        {...defaultOptOutProps}
        optOutFeature={() =>
            new Promise(resolve => setTimeout(resolve, 1000))
          }
      />
    </MockConfluenceXFlowProvider>
  )
  .add('Opt Out, error flag after failed request', () =>
    <MockConfluenceXFlowProvider {...defaultProps}>
      <XFlowOptOut
        {...defaultOptOutProps}
        optOutFeature={() =>
            new Promise((_, reject) =>
              setTimeout(() => reject({ message: 'Example failure' }), 1000))
          }
      />
    </MockConfluenceXFlowProvider>
  )
  .add('Opt Out, success flag after successful request', () =>
    <MockConfluenceXFlowProvider {...defaultProps}>
      <XFlowOptOut
        {...defaultOptOutProps}
        optOutFeature={() =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ message: 'Example failure' }), 1000))
        }
      />
    </MockConfluenceXFlowProvider>
  );
