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
  ).add('Show Grant Access dialog with 25% progress', () => setupStorybookAnalytics(
    <MockConfluenceCrossSell canCurrentUserAddProduct={() => Promise.resolve(true)}>
      <GrantAccess analyticsId="growth.happy" progress={25} />
    </MockConfluenceCrossSell>
    )
  ).add('Show Grant Access dialog with 100% progress', () => setupStorybookAnalytics(
    <MockConfluenceCrossSell canCurrentUserAddProduct={() => Promise.resolve(true)}>
      <GrantAccess analyticsId="growth.happy" progress={100} />
    </MockConfluenceCrossSell>
    )
  );
