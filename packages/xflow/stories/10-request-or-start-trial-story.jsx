import forEach from 'lodash/forEach';
import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import { RequestOrStartTrial } from '@atlaskit/xflow';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import mockXFlowProviderFactory from './helpers/mockXFlowProviderFactory';

import JiraToConfluenceXFlowProvider from '../src/product-xflow-providers/JiraToConfluenceXFlowProvider';
import JiraToJSDXFlowProvider from '../src/product-xflow-providers/JiraToJSDXFlowProvider';
import JiraToJSWXFlowProvider from '../src/product-xflow-providers/JiraToJSWXFlowProvider';
import JiraToJCXFlowProvider from '../src/product-xflow-providers/JiraToJCXFlowProvider';

import mockProductStatusChecker from './helpers/mockProductStatusChecker';
import { ACTIVE, ACTIVATING, DEACTIVATED, UNKNOWN } from '../src/common/productProvisioningStates';

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const XFLOW_PROVIDERS_UNDER_TEST = {
  Confluence: {
    provider: JiraToConfluenceXFlowProvider,
    hasGrantAccess: true,
    hasContextualStart: true,
  },
  JiraServiceDesk: {
    provider: JiraToJSDXFlowProvider,
    hasGrantAccess: true,
    hasContextualStart: false,
  },
  JiraSoftware: {
    provider: JiraToJSWXFlowProvider,
    hasGrantAccess: false,
    hasContextualStart: false,
  },
  JiraCore: {
    provider: JiraToJCXFlowProvider,
    hasGrantAccess: false,
    hasContextualStart: false,
  },
};

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
  cancelStartProductTrial: async () => {
  },
  grantAccessToUsers: () => delay(1000),
  goToProduct: async () => {
  },
  closeLoadingDialog: async () => {
  },
  requestTrialWithNote: async () => delay(1000),
  cancelRequestTrial: async () => {
  },
  checkProductRequestFlag: async () => {
  },
  setProductRequestFlag: async () => {
  },
};

const defaultRequestOrStartTrialProps = {
  onAnalyticsEvent: action('onAnalyticsEvent'),
  sourceComponent: 'storybook-example-compontent',
  sourceContext: 'storybook-example-context',
  targetProduct: 'storybook-example-product',
};

forEach(XFLOW_PROVIDERS_UNDER_TEST, ({ provider, hasGrantAccess, hasContextualStart },
                                     productName) => {
  const MockXFlowProvider = mockXFlowProviderFactory(provider);

  let story = storiesOf(`RequestOrStartTrial (${productName})`);

  if (hasGrantAccess) {
    story = story.add('User can add a product (INACTIVE), Start Trial flow with Grant Access screen', () =>
      setupStorybookAnalytics(
        <MockXFlowProvider {...defaultProps} canCurrentUserAddProduct={async () => true}>
          <RequestOrStartTrial
            {...defaultRequestOrStartTrialProps}
            onTrialActivating={action('onTrialActivating')}
            grantAccessEnabled
          />
        </MockXFlowProvider>
      )
    );
  }

  story = story
    .add('User can add a product (INACTIVE), Start Trial flow without Grant Access screen', () =>
      setupStorybookAnalytics(
        <MockXFlowProvider {...defaultProps} canCurrentUserAddProduct={async () => true}>
          <RequestOrStartTrial
            {...defaultRequestOrStartTrialProps}
            onTrialActivating={action('onTrialActivating')}
            grantAccessEnabled={false}
          />
        </MockXFlowProvider>
      )
    )
    .add('User can add a product (DEACTIVATED), Start Trial flow without Grant Access screen', () =>
      setupStorybookAnalytics(
        <MockXFlowProvider
          {...defaultProps}
          canCurrentUserAddProduct={async () => true}
          productStatusChecker={mockProductStatusChecker(DEACTIVATED)}
        >
          <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
        </MockXFlowProvider>
      )
    );

  if (hasContextualStart) {
    story = story.add('User can add a product (INACTIVE), Contextual Start Trial flow with Grant Access screen', () =>
      setupStorybookAnalytics(
        <MockXFlowProvider {...defaultProps} canCurrentUserAddProduct={async () => true}>
          <RequestOrStartTrial
            {...defaultRequestOrStartTrialProps}
            onTrialActivating={action('onTrialActivating')}
            contextInfo={{
              contextualHeading: 'Project pages are powered by Confluence',
              contextualMessage: 'Create, share, and collaborate on all your project docs in one place, with Confluence pages.',
              reactivateCTA: 'Reactivate Confluence',
              trialCTA: 'Try Confluence free for 30 days',
            }}
          />
        </MockXFlowProvider>
      )
    )
      .add('User can add a product (DEACTIVATED), Contextual Start Trial flow without Grant Access screen', () =>
        setupStorybookAnalytics(
          <MockXFlowProvider
            {...defaultProps}
            canCurrentUserAddProduct={async () => true}
            productStatusChecker={mockProductStatusChecker(DEACTIVATED)}
          >
            <RequestOrStartTrial
              {...defaultRequestOrStartTrialProps}
              contextInfo={{
                contextualHeading: 'Project pages are powered by Confluence',
                contextualMessage: 'Create, share, and collaborate on all your project docs in one place, with Confluence pages.',
                reactivateCTA: 'Reactivate Confluence',
                trialCTA: 'Try Confluence free for 30 days',
              }}
            />
          </MockXFlowProvider>
        )
      );
  }

  story.add('User can add a product (ACTIVATING), Already Started with progress bar', () =>
    setupStorybookAnalytics(
      <MockXFlowProvider
        {...defaultProps}
        productStatusChecker={mockProductStatusChecker(ACTIVATING)}
        canCurrentUserAddProduct={async () => true}
      >
        <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
      </MockXFlowProvider>
    )
  )
    .add('User can add a product (ACTIVE), Already Started', () =>
      setupStorybookAnalytics(
        <MockXFlowProvider
          {...defaultProps}
          productStatusChecker={mockProductStatusChecker(ACTIVE)}
          canCurrentUserAddProduct={async () => true}
        >
          <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
        </MockXFlowProvider>
      )
    )
    .add('User cannot add a product (INACTIVE), Request Trial', () =>
      setupStorybookAnalytics(
        <MockXFlowProvider {...defaultProps}>
          <RequestOrStartTrial
            {...defaultRequestOrStartTrialProps}
            onTrialRequested={action('onTrialRequested')}
          />
        </MockXFlowProvider>
      )
    )
    .add('Initializing dialog, (user can add a product), awaiting current product status (never resolves)', () =>
      setupStorybookAnalytics(
        <MockXFlowProvider
          {...defaultProps}
          productStatusChecker={{
            check() {
              return new Promise(() => {
              });
            },
            start() {
            },
            stop() {
            },
          }}
          canCurrentUserAddProduct={async () => true}
        >
          <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
        </MockXFlowProvider>
      )
    )
    .add('Initializing dialog, (user can add a product), Error flag after product status check fails (UNKNOWN)', () =>
      setupStorybookAnalytics(
        <MockXFlowProvider
          {...defaultProps}
          productStatusChecker={{
            check() {
              return new Promise(resolve => setTimeout(() => resolve(UNKNOWN), 500));
            },
            start() {
            },
            stop() {
            },
          }}
          canCurrentUserAddProduct={async () => true}
        >
          <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
        </MockXFlowProvider>
      )
    )
    .add('Failed to retrieve permission to add product, fallback to request trial', () =>
      setupStorybookAnalytics(
        <MockXFlowProvider
          {...defaultProps}
          canCurrentUserAddProduct={() =>
            new Promise((_, reject) => setTimeout(() => reject(new Error('Misc')), 500))}
        >
          <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
        </MockXFlowProvider>
      )
    );
});
