import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import { RequestOrStartTrial } from '@atlaskit/xflow';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import MockConfluenceXFlow from './providers/MockConfluenceXFlowProvider';

import mockConfluenceStatusChecker from './providers/mockConfluenceStatusChecker';
import { INACTIVE, ACTIVE, ACTIVATING } from '../src/common/productProvisioningStates';

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const defaultProps = {
  isProductInstalledOrActivating: async () => INACTIVE,
  canCurrentUserAddProduct: async () => false,
  hasProductBeenEvaluated: async () => false,
  retrieveUsers: () =>
    Promise.resolve([
      { name: 'lhunt', displayName: 'Lachlan Hunt', email: 'lhunt@example.com' },
      { name: 'awakeling', displayName: 'Andrew Wakeling', email: 'awakeling@example.com' },
      { name: 'ahammond', displayName: 'Andrew Hammond', email: 'ahammond@example.com' },
      { name: 'mtruong', displayName: 'Michael Truong', email: 'mtruong@example.com' },
      { name: 'gburrows', displayName: 'George Burrows', email: 'gburrows@example.com' },
    ]),
  cancelStartProductTrial: async () => {},
  grantAccessToUsers: () => delay(1000),
  goToProduct: async () => {},
  goToLearnMore: async () => {},
  closeLoadingDialog: async () => {},
  requestTrialAccess: () => delay(1000),
  requestTrialAccessWithNote: () => delay(1000),
  requestTrialAccessWithoutNote: () => delay(1000),
  cancelRequestTrialAccess: async () => {},
  onAnalyticsEvent: action('onAnalyticsEvent'),
};

storiesOf('RequestOrStartTrial')
  .add('if a user can add a product, show Start Trial', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow
        {...defaultProps} // 1
        canCurrentUserAddProduct={async () => true}
      >
        <RequestOrStartTrial
          onTrialActivating={() => console.log('Activating...')}
          analyticsId="growth.happy"
        />
      </MockConfluenceXFlow>
    )
  )
  .add(
    'if a user can add a product, but the product has been evaluated previously, skip the grant access screen',
    () =>
      setupStorybookAnalytics(
        <MockConfluenceXFlow
          {...defaultProps} // 2
          canCurrentUserAddProduct={async () => true}
          hasProductBeenEvaluated={async () => true}
        >
          <RequestOrStartTrial analyticsId="growth.happy" />
        </MockConfluenceXFlow>
      )
  )
  .add('if the product is already active, show Already Started', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow
        {...defaultProps} // 3
        productStatusChecker={mockConfluenceStatusChecker(ACTIVE)}
        canCurrentUserAddProduct={async () => true}
      >
        <RequestOrStartTrial analyticsId="growth.happy" />
      </MockConfluenceXFlow>
    )
  )
  .add('if the product is currently activating, show Already Started with progress bar', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow
        {...defaultProps} // 3
        productStatusChecker={mockConfluenceStatusChecker(ACTIVATING)}
        canCurrentUserAddProduct={async () => true}
      >
        <RequestOrStartTrial analyticsId="growth.happy" />
      </MockConfluenceXFlow>
    )
  )
  .add('if a user can not add a product, show Request Trial', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow
        {...defaultProps} // 4
      >
        <RequestOrStartTrial
          onTrialRequested={() => console.log('Trial requested')}
          analyticsId="growth.happy"
        />
      </MockConfluenceXFlow>
    )
  )
  .add(
    'before we know the status of previous confluence use or the user permissions, show the initializing dialog',
    () =>
      setupStorybookAnalytics(
        <MockConfluenceXFlow
          {...defaultProps} // 5
          isProductInstalledOrActivating={() => new Promise(() => {})} // Never resolves
        >
          <RequestOrStartTrial analyticsId="growth.happy" />
        </MockConfluenceXFlow>
      )
  )
  .add('if there was an error, show the error flag', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow
        {...defaultProps} // 6
        canCurrentUserAddProduct={() =>
          new Promise((_, reject) => setTimeout(() => reject(new Error('Misc')), 1500))}
        requestTrialAccess={async () => true}
      >
        <RequestOrStartTrial analyticsId="growth.happy" />
      </MockConfluenceXFlow>
    )
  );
