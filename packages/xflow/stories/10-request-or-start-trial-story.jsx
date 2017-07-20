import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { RequestOrStartTrial } from '@atlaskit/xflow';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import MockConfluenceXFlow from './providers/MockConfluenceXFlowProvider';

storiesOf('RequestOrStartTrial')
  .add('if a user can add a product, show Start Trial', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow
        isProductInstalledOrActivating={() => Promise.resolve(false)}
        canCurrentUserAddProduct={() => Promise.resolve(true)}
        hasProductBeenEvaluated={() => Promise.resolve(false)}
        retrieveUsers={() =>
          Promise.resolve([
            { name: 'lhunt', displayName: 'Lachlan Hunt', email: 'lhunt@example.com' },
            { name: 'awakeling', displayName: 'Andrew Wakeling', email: 'awakeling@example.com' },
            { name: 'ahammond', displayName: 'Andrew Hammond', email: 'ahammond@example.com' },
            { name: 'mtruong', displayName: 'Michael Truong', email: 'mtruong@example.com' },
            { name: 'gburrows', displayName: 'George Burrows', email: 'gburrows@example.com' },
          ])}
        startProductTrial={() => new Promise(resolve => setTimeout(resolve, 1000))}
        cancelStartProductTrial={() => Promise.resolve()}
        grantAccessToUsers={() => new Promise(resolve => setTimeout(resolve, 1000))}
        goToProduct={() => Promise.resolve()}
        closeLoadingDialog={() => Promise.resolve()}
      >
        <RequestOrStartTrial analyticsId="growth.happy" />
      </MockConfluenceXFlow>
    )
  )
  .add(
    'if a user can add a product, but the product has been evaluated previously, skip the grant access screen',
    () =>
      setupStorybookAnalytics(
        <MockConfluenceXFlow
          isProductInstalledOrActivating={() => Promise.resolve(false)}
          canCurrentUserAddProduct={() => Promise.resolve(true)}
          hasProductBeenEvaluated={() => Promise.resolve(true)}
          startProductTrial={() => new Promise(resolve => setTimeout(resolve, 1000))}
          cancelStartProductTrial={() => Promise.resolve()}
          goToProduct={() => Promise.resolve()}
          closeLoadingDialog={() => Promise.resolve()}
        >
          <RequestOrStartTrial analyticsId="growth.happy" />
        </MockConfluenceXFlow>
      )
  )
  .add('if the product is already installed or activating, show Already Started', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow
        isProductInstalledOrActivating={() => Promise.resolve(true)}
        canCurrentUserAddProduct={() => Promise.resolve(true)}
        goToProduct={() => Promise.resolve()}
      >
        <RequestOrStartTrial analyticsId="growth.happy" />
      </MockConfluenceXFlow>
    )
  )
  .add('if a user can not add a product, show Request Trial', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow
        isProductInstalledOrActivating={() => Promise.resolve(false)}
        canCurrentUserAddProduct={() => Promise.resolve(false)}
        requestTrialAccess={() => new Promise(resolve => setTimeout(resolve, 1000))}
        requestTrialAccessWithNote={() => new Promise(resolve => setTimeout(resolve, 1000))}
        requestTrialAccessWithoutNote={() => new Promise(resolve => setTimeout(resolve, 1000))}
        cancelRequestTrialAccess={() => Promise.resolve(true)}
      >
        <RequestOrStartTrial analyticsId="growth.happy" />
      </MockConfluenceXFlow>
    )
  )
  .add(
    'before we know the status of previous confluence use or the user permissions, show the initializing dialog',
    () =>
      setupStorybookAnalytics(
        <MockConfluenceXFlow isProductInstalledOrActivating={() => new Promise(() => {})}>
          <RequestOrStartTrial analyticsId="growth.happy" />
        </MockConfluenceXFlow>
      )
  )
  .add('if there was an error, show the error flag', () =>
    setupStorybookAnalytics(
      <MockConfluenceXFlow
        isProductInstalledOrActivating={() => Promise.resolve(false)}
        canCurrentUserAddProduct={() =>
          new Promise((_, reject) => setTimeout(() => reject(new Error('Misc')), 1500))}
        requestTrialAccess={() => Promise.resolve(true)}
      >
        <RequestOrStartTrial analyticsId="growth.happy" />
      </MockConfluenceXFlow>
    )
  );
