import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { RequestOrStartTrial } from '@atlaskit/cross-acquisition';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import MockConfluenceCrossSell from './providers/MockConfluenceCrossSellProvider';

storiesOf('RequestOrStartTrial')
  .add('if a user can add a product, show Start Trial', () =>
    setupStorybookAnalytics(
      <MockConfluenceCrossSell
        canCurrentUserAddProduct={() => Promise.resolve(true)}
      >
        <RequestOrStartTrial analyticsId="growth.happy" />
      </MockConfluenceCrossSell>
    )
  )
  .add('if a user can not add a product, show Request Trial', () =>
    setupStorybookAnalytics(
      <MockConfluenceCrossSell
        canCurrentUserAddProduct={() => Promise.resolve(false)}
      >
        <RequestOrStartTrial analyticsId="growth.happy" />
      </MockConfluenceCrossSell>
    )
  )
  .add('if there was an error, show the error dialog', () =>
    setupStorybookAnalytics(
      <MockConfluenceCrossSell
        canCurrentUserAddProduct={() => Promise.reject(new Error('Misc'))}
      >
        <RequestOrStartTrial analyticsId="growth.happy" />
      </MockConfluenceCrossSell>
    )
  );
