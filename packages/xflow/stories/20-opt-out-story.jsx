import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { OptOut } from '@atlaskit/xflow';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';
import MockConfluenceXFlow from './providers/MockConfluenceXFlowProvider';

storiesOf('OptOut')
  .add('show the dialog', () => setupStorybookAnalytics(
    <MockConfluenceXFlow>
      <OptOut />
    </MockConfluenceXFlow>
    )
  );

