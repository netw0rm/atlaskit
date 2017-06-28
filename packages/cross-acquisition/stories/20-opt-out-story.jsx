import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { OptOut } from '@atlaskit/cross-acquisition';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import MockConfluenceCrossSell from './providers/MockConfluenceCrossSellProvider';

storiesOf('OptOut')
  .add('show the dialog', () => setupStorybookAnalytics(
    <MockConfluenceCrossSell>
      <OptOut />
    </MockConfluenceCrossSell>
    )
  );

