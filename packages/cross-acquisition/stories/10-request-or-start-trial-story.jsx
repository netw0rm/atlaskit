import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { RequestOrStartTrial } from '@atlaskit/cross-acquisition';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import MockConfluenceCrossSell from './providers/MockConfluenceCrossSellProvider';

storiesOf('RequestOrStartTrial')
  .add('if a user can add a product, show Start Trial', () =>
    setupStorybookAnalytics(
      <MockConfluenceCrossSell
        isProductInstalledOrActivating={() => Promise.resolve(false)}
        canCurrentUserAddProduct={() => Promise.resolve(true)}
        startProductTrial={() => new Promise(resolve => setTimeout(resolve, 1000))}
        cancelStartProductTrial={() => Promise.resolve()}
        grantAccessToUsers={() => new Promise(resolve => setTimeout(resolve, 1000))}
        goToProduct={() => Promise.resolve()}
        closeLoadingDialog={() => Promise.resolve()}
      >
        <RequestOrStartTrial analyticsId="growth.happy" />
      </MockConfluenceCrossSell>
    )
  )
  .add('if the product is already installed or activating, show Already Started', () =>
    setupStorybookAnalytics(
      <MockConfluenceCrossSell
        isProductInstalledOrActivating={() => Promise.resolve(true)}
        canCurrentUserAddProduct={() => Promise.resolve(true)}
        goToProduct={() => Promise.resolve()}
      >
        <RequestOrStartTrial analyticsId="growth.happy" />
      </MockConfluenceCrossSell>
    )
  )
  .add('if a user can not add a product, show Request Trial', () =>
    setupStorybookAnalytics(
      <MockConfluenceCrossSell
        isProductInstalledOrActivating={() => Promise.resolve(false)}
        canCurrentUserAddProduct={() => Promise.resolve(false)}
        requestTrialAccess={() => new Promise(resolve => setTimeout(resolve, 1000))}
        requestTrialAccessWithNote={() => new Promise(resolve => setTimeout(resolve, 1000))}
        requestTrialAccessWithoutNote={() => new Promise(resolve => setTimeout(resolve, 1000))}
        cancelRequestTrialAccess={() => Promise.resolve(true)}
      >
        <RequestOrStartTrial analyticsId="growth.happy" />
      </MockConfluenceCrossSell>
    )
  )
  .add('if there was an error, show the error dialog', () =>
    setupStorybookAnalytics(
      <MockConfluenceCrossSell
        isProductInstalledOrActivating={() => Promise.resolve(false)}
        canCurrentUserAddProduct={() => Promise.reject(new Error('Misc'))}
        requestTrialAccess={() => Promise.resolve(true)}
      >
        <RequestOrStartTrial analyticsId="growth.happy" />
      </MockConfluenceCrossSell>
    )
  );
