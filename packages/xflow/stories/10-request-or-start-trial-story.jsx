import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import { RequestOrStartTrial } from '@atlaskit/xflow';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import MockConfluenceXFlow from './providers/MockConfluenceXFlowProvider';

import mockConfluenceStatusChecker from './providers/mockConfluenceStatusChecker';
import { ACTIVE, ACTIVATING, DEACTIVATED } from '../src/common/productProvisioningStates';

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const defaultProps = {
  canCurrentUserAddProduct: async () => false,
  retrieveUsers: () =>
    Promise.resolve([
      { name: 'lhunt', 'display-name': 'Lachlan Hunt', email: 'lhunt@example.com' },
      { name: 'awakeling', 'display-name': 'Andrew Wakeling', email: 'awakeling@example.com' },
      { name: 'ahammond', 'display-name': 'Andrew Hammond', email: 'ahammond@example.com' },
      { name: 'mtruong', 'display-name': 'Michael Truong', email: 'mtruong@example.com' },
      { name: 'gburrows', 'display-name': 'George Burrows', email: 'gburrows@example.com' },
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
  .add('User can add a product (INACTIVE), Start Trial flow with Grant Access screen', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow {...defaultProps} canCurrentUserAddProduct={async () => true}>
        <RequestOrStartTrial
          {...defaultRequestOrStartTrialProps}
          onTrialActivating={action('onTrialActivating')}
        />
      </MockConfluenceXFlow>
    )
  )
  .add('User can add a product (DEACTIVATED), Start Trial flow without Grant Access screen', () =>
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
  .add('User can add a product (ACTIVATING), Already Started with progress bar', () =>
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
  .add('User can add a product (ACTIVE), Already Started', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow
        {...defaultProps}
        productStatusChecker={mockConfluenceStatusChecker(ACTIVE)}
        canCurrentUserAddProduct={async () => false}
      >
        <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
      </MockConfluenceXFlow>
    )
  )
  .add('User cannot add a product (INACTIVE), Request Trial', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow {...defaultProps}>
        <RequestOrStartTrial
          {...defaultRequestOrStartTrialProps}
          onTrialRequested={action('onTrialRequested')}
        />
      </MockConfluenceXFlow>
    )
  )
  .add('Initializing dialog, awaiting current product status', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow
        {...defaultProps}
        productStatusChecker={{
          check() {
            return new Promise(() => {});
          },
          start() {},
          stop() {},
        }}
      >
        <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
      </MockConfluenceXFlow>
    )
  )
  .add('Initialisation error, Error flag', () =>
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
