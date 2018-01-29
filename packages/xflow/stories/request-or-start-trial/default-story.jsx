import forEach from 'lodash/forEach';
import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import { RequestOrStartTrial } from '../../src';

import setupStorybookAnalytics from '../helpers/setupStorybookAnalytics';
import mockXFlowProviderFactory from '../helpers/mockXFlowProviderFactory';

import JiraToConfluenceXFlowProvider from '../../src/product-xflow-providers/JiraToConfluenceXFlowProvider';
import JiraToJSDXFlowProvider from '../../src/product-xflow-providers/JiraToJSDXFlowProvider';
import JiraToJSWXFlowProvider from '../../src/product-xflow-providers/JiraToJSWXFlowProvider';
import JiraToJCXFlowProvider from '../../src/product-xflow-providers/JiraToJCXFlowProvider';

import mockProductStatusChecker from '../helpers/mockProductStatusChecker';
import { ACTIVE, ACTIVATING, DEACTIVATED, UNKNOWN } from '../../src/common/productProvisioningStates';

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

const defaultXFlowProviderProps = {
  canCurrentUserAddProduct: () => true,
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
  cancelStartProductTrial: action('mock cancelStartProductTrial'),
  grantAccessToUsers: (...args) => { action('mock grantAccessToUsers')(...args); return delay(1000); },
  goToProduct: action('mock goToProduct'),
  closeLoadingDialog: action('mock closeLoadingDialog'),
  requestTrialWithNote: (...args) => { action('mock requestTrialWithNote')(...args); return delay(1000); },
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

forEach(XFLOW_PROVIDERS_UNDER_TEST, ({ provider, hasGrantAccess, hasContextualStart },
                                     productName) => {
  const MockXFlowProvider = mockXFlowProviderFactory(provider);

  let stories = storiesOf(`request-or-start-trial/RequestOrStartTrial (${productName})`, module);
  stories = stories.addDecorator(story => setupStorybookAnalytics(story()));

  if (hasGrantAccess) {
    stories = stories.add('User can add a product (INACTIVE), Start Trial flow with Grant Access screen', () =>
      <MockXFlowProvider
        {...defaultXFlowProviderProps}
      >
        <RequestOrStartTrial
          {...defaultRequestOrStartTrialProps}
          onTrialActivating={action('onTrialActivating')}
          grantAccessEnabled
        />
      </MockXFlowProvider>
    );
  }

  stories = stories
    .add('User can add a product (INACTIVE), Start Trial flow without Grant Access screen, with opt out link', () =>
      <MockXFlowProvider
        {...defaultXFlowProviderProps}
      >
        <RequestOrStartTrial
          {...defaultRequestOrStartTrialProps}
          onTrialActivating={action('onTrialActivating')}
          grantAccessEnabled={false}
          isCrossSell
        />
      </MockXFlowProvider>
    )
    .add('User can add a product (INACTIVE), Start Trial flow without Grant Access screen', () =>
      <MockXFlowProvider
        {...defaultXFlowProviderProps}
      >
        <RequestOrStartTrial
          {...defaultRequestOrStartTrialProps}
          onTrialActivating={action('onTrialActivating')}
          grantAccessEnabled={false}
        />
      </MockXFlowProvider>
    )
    .add('User can add a product (DEACTIVATED), Start Trial flow without Grant Access screen', () =>
      <MockXFlowProvider
        {...defaultXFlowProviderProps}
        productStatusChecker={mockProductStatusChecker(DEACTIVATED)}
      >
        <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
      </MockXFlowProvider>
    );

  if (hasContextualStart) {
    stories = stories.add('User can add a product (INACTIVE), Contextual Start Trial flow with Grant Access screen', () =>
      <MockXFlowProvider
        {...defaultXFlowProviderProps}
      >
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
      .add('User can add a product (DEACTIVATED), Contextual Start Trial flow without Grant Access screen', () =>
        <MockXFlowProvider
          {...defaultXFlowProviderProps}
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
      );
  }

  stories.add('User can add a product (ACTIVATING), Already Started with progress bar', () =>
    <MockXFlowProvider
      {...defaultXFlowProviderProps}
      productStatusChecker={mockProductStatusChecker(ACTIVATING)}
    >
      <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
    </MockXFlowProvider>
  )
    .add('User can add a product (ACTIVE), Already Started', () =>
      <MockXFlowProvider
        {...defaultXFlowProviderProps}
        productStatusChecker={mockProductStatusChecker(ACTIVE)}
      >
        <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
      </MockXFlowProvider>
    )
    .add('User cannot add a product (INACTIVE), Request Trial', () =>
      <MockXFlowProvider
        {...defaultXFlowProviderProps}
        canCurrentUserAddProduct={() => false}
      >
        <RequestOrStartTrial
          {...defaultRequestOrStartTrialProps}
          onTrialRequested={action('onTrialRequested')}
        />
      </MockXFlowProvider>
    )
    .add('Initializing dialog, (user can add a product), awaiting current product status (never resolves)', () =>
      <MockXFlowProvider
        {...defaultXFlowProviderProps}
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
      >
        <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
      </MockXFlowProvider>
    )
    .add('Initializing dialog, (user can add a product), Error flag after product status check fails (UNKNOWN)', () =>
      <MockXFlowProvider
        {...defaultXFlowProviderProps}
        productStatusChecker={{
          check() {
            return new Promise(resolve => setTimeout(() => resolve(UNKNOWN), 500));
          },
          start() {
          },
          stop() {
          },
        }}
      >
        <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
      </MockXFlowProvider>
    )
    .add('Failed to retrieve permission to add product, fallback to request trial', () =>
      <MockXFlowProvider
        {...defaultXFlowProviderProps}
        canCurrentUserAddProduct={() =>
            new Promise((_, reject) => setTimeout(() => reject(new Error('Misc')), 500))}
      >
        <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
      </MockXFlowProvider>
    );
});
