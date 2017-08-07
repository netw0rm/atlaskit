import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import { RequestOrStartTrial } from '@atlaskit/xflow';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import MockConfluenceXFlow from './providers/MockConfluenceXFlowProvider';

import mockConfluenceStatusChecker from './providers/mockConfluenceStatusChecker';
import { ACTIVE, ACTIVATING, INACTIVE, DEACTIVATED } from '../src/common/productProvisioningStates';

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const defaultProps = {
  isProductInstalledOrActivating: async () => INACTIVE,
  canCurrentUserAddProduct: async () => false,
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
};

const defaultRequestOrStartTrialProps = {
  onAnalyticsEvent: action('onAnalyticsEvent'),
};

storiesOf('RequestOrStartTrial')
  .add('if a user can add a product, show Start Trial', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow {...defaultProps} canCurrentUserAddProduct={async () => true}>
        <RequestOrStartTrial
          {...defaultRequestOrStartTrialProps}
          onTrialActivating={action('onTrialActivating')}
        />
      </MockConfluenceXFlow>
    )
  )
  .add(
    'if a user can add a product, but the product has been evaluated previously, skip the grant access screen',
    () =>
      setupStorybookAnalytics(
        <MockConfluenceXFlow
          {...defaultProps}
          canCurrentUserAddProduct={async () => true}
          productStatusChecker={mockConfluenceStatusChecker(DEACTIVATED)}
        >
          <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
        </MockConfluenceXFlow>
      )
  )
  .add('if the product is already active, show Already Started', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow
        {...defaultProps}
        productStatusChecker={mockConfluenceStatusChecker(ACTIVE)}
        canCurrentUserAddProduct={async () => true}
      >
        <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
      </MockConfluenceXFlow>
    )
  )
  .add('if the product is currently activating, show Already Started with progress bar', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow
        {...defaultProps}
        productStatusChecker={mockConfluenceStatusChecker(ACTIVATING)}
        canCurrentUserAddProduct={async () => true}
      >
        <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
      </MockConfluenceXFlow>
    )
  )
  .add('if a user can not add a product, show Request Trial', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow {...defaultProps}>
        <RequestOrStartTrial
          {...defaultRequestOrStartTrialProps}
          onTrialRequested={action('onTrialRequested')}
        />
      </MockConfluenceXFlow>
    )
  )
  .add(
    'before we know the status of previous confluence use or the user permissions, show the initializing dialog',
    () =>
      setupStorybookAnalytics(
        <MockConfluenceXFlow
          {...defaultProps}
          isProductInstalledOrActivating={() => new Promise(() => {})} // Never resolves
        >
          <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
        </MockConfluenceXFlow>
      )
  )
  .add('if there was an error, show the error flag', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow
        {...defaultProps}
        canCurrentUserAddProduct={() =>
          new Promise((_, reject) => setTimeout(() => reject(new Error('Misc')), 1500))}
        requestTrialAccess={async () => true}
      >
        <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
      </MockConfluenceXFlow>
    )
  );
