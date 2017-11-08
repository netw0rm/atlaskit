import { storiesOf } from '@kadira/storybook';
import React from 'react';
import ProgressIndicator from '../src/request-or-start-trial/components/ProgressIndicator';
import { ACTIVE, ACTIVATING, UNKNOWN } from '../src/common/productProvisioningStates';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';

storiesOf('request-or-start-trial/ProgressIndicator')
  .add('Empty Progress Bar', () =>
    setupStorybookAnalytics(<ProgressIndicator progress={0} status={ACTIVATING} />)
  )
  .add('25% Full, ACTIVATING status', () =>
    setupStorybookAnalytics(<ProgressIndicator progress={0.25} status={ACTIVATING} />)
  )
  .add('50% Full, UNKNOWN status', () =>
    setupStorybookAnalytics(<ProgressIndicator progress={0.5} status={UNKNOWN} />)
  )
  .add('Complete, ACTIVE status', () =>
    setupStorybookAnalytics(<ProgressIndicator progress={1} status={ACTIVE} />)
  )
  .add('Complete, ACTIVATING status', () =>
    setupStorybookAnalytics(<ProgressIndicator progress={1} status={ACTIVATING} />)
  );
