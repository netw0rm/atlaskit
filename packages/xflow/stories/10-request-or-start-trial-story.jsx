import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import { RequestOrStartTrial } from '@atlaskit/xflow';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import MockConfluenceXFlowProvider from './providers/MockConfluenceXFlowProvider';

import mockConfluenceStatusChecker from './providers/mockConfluenceStatusChecker';
import { ACTIVE, ACTIVATING, DEACTIVATED, UNKNOWN } from '../src/common/productProvisioningStates';

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const defaultProps = {
  canCurrentUserAddProduct: async () => false,
  retrieveUsers: () =>
    Promise.resolve([
      {
        name: 'lhunt',
        'display-name': 'Lachlan Hunt',
        email: 'lhunt@example.com',
        attributes: {
          attributes: [
            {
              name: 'atlassianid.openid.identity',
              values: ['https://id.atlassian.com/openid/v2/u/1'],
            },
          ],
        },
      },
      {
        name: 'awakeling',
        'display-name': 'Andrew Wakeling',
        email: 'awakeling@example.com',
        attributes: {
          attributes: [
            {
              name: 'atlassianid.openid.identity',
              values: ['https://id.atlassian.com/openid/v2/u/2'],
            },
          ],
        },
      },
      {
        name: 'ahammond',
        'display-name': 'Andrew Hammond',
        email: 'ahammond@example.com',
        attributes: {
          attributes: [
            {
              name: 'atlassianid.openid.identity',
              values: ['https://id.atlassian.com/openid/v2/u/3'],
            },
          ],
        },
      },
      {
        name: 'mtruong',
        'display-name': 'Michael Truong',
        email: 'mtruong@example.com',
        attributes: {
          attributes: [
            {
              name: 'atlassianid.openid.identity',
              values: ['https://id.atlassian.com/openid/v2/u/4'],
            },
          ],
        },
      },
      {
        name: 'gburrows',
        'display-name': 'George Burrows',
        email: 'gburrows@example.com',
        attributes: {
          attributes: [
            {
              name: 'atlassianid.openid.identity',
              values: ['https://id.atlassian.com/openid/v2/u/5'],
            },
          ],
        },
      },
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
  sourceComponent: 'storybook-example-compontent',
  sourceContext: 'storybook-example-context',
};

storiesOf('RequestOrStartTrial')
  .add('User can add a product (INACTIVE), Start Trial flow with Grant Access screen', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlowProvider {...defaultProps} canCurrentUserAddProduct={async () => true}>
        <RequestOrStartTrial
          {...defaultRequestOrStartTrialProps}
          onTrialActivating={action('onTrialActivating')}
        />
      </MockConfluenceXFlowProvider>
    )
  )
  .add('User can add a product (DEACTIVATED), Start Trial flow without Grant Access screen', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlowProvider
        {...defaultProps}
        canCurrentUserAddProduct={async () => true}
        productStatusChecker={mockConfluenceStatusChecker(DEACTIVATED)}
      >
        <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
      </MockConfluenceXFlowProvider>
    )
  )
  .add('User can add a product (ACTIVATING), Already Started with progress bar', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlowProvider
        {...defaultProps}
        productStatusChecker={mockConfluenceStatusChecker(ACTIVATING)}
        canCurrentUserAddProduct={async () => true}
      >
        <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
      </MockConfluenceXFlowProvider>
    )
  )
  .add('User can add a product (ACTIVE), Already Started', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlowProvider
        {...defaultProps}
        productStatusChecker={mockConfluenceStatusChecker(ACTIVE)}
        canCurrentUserAddProduct={async () => false}
      >
        <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
      </MockConfluenceXFlowProvider>
    )
  )
  .add('User cannot add a product (INACTIVE), Request Trial', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlowProvider {...defaultProps}>
        <RequestOrStartTrial
          {...defaultRequestOrStartTrialProps}
          onTrialRequested={action('onTrialRequested')}
        />
      </MockConfluenceXFlowProvider>
    )
  )
  .add('Initializing dialog, awaiting current product status (never resolves)', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlowProvider
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
      </MockConfluenceXFlowProvider>
    )
  )
  .add('Initializing dialog, Error flag after product status check fails (UNKNOWN)', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlowProvider
        {...defaultProps}
        productStatusChecker={{
          check() {
            return new Promise(resolve => setTimeout(() => resolve(UNKNOWN), 500));
          },
          start() {},
          stop() {},
        }}
      >
        <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
      </MockConfluenceXFlowProvider>
    )
  )
  .add('Initialisation error, Error flag after trusted user check failed', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlowProvider
        {...defaultProps}
        canCurrentUserAddProduct={() =>
          new Promise((_, reject) => setTimeout(() => reject(new Error('Misc')), 500))}
        requestTrialAccess={async () => true}
      >
        <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
      </MockConfluenceXFlowProvider>
    )
  );
