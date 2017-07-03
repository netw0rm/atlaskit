import { storiesOf } from '@kadira/storybook';
import React from 'react';

import GrantAccess from '../src/start-trial/components/GrantAccess';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import MockConfluenceCrossSell from './providers/MockConfluenceCrossSellProvider';

storiesOf('GrantAccess')
  .add('Show Grant Access dialog', () => setupStorybookAnalytics(
    <MockConfluenceCrossSell canCurrentUserAddProduct={() => Promise.resolve(true)}>
      <GrantAccess analyticsId="growth.happy" />
    </MockConfluenceCrossSell>
    )
  );
