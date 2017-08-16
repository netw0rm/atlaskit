import { storiesOf } from '@kadira/storybook';
import React from 'react';
import ProgressIndicator from '../src/start-trial/components/ProgressIndicator';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';

storiesOf('ProgressIndicator')
  .add('Empty Progress Bar', () =>
    setupStorybookAnalytics(<ProgressIndicator progress={0} status="INACTIVE" />)
  )
  .add('25% Full, INACTIVE status', () =>
    setupStorybookAnalytics(<ProgressIndicator progress={0.25} status="INACTIVE" />)
  )
  .add('50% Full, UNKNOWN status', () =>
    setupStorybookAnalytics(<ProgressIndicator progress={0.5} status="UNKNOWN" />)
  )
  .add('Complete, ACTIVE status', () =>
    setupStorybookAnalytics(<ProgressIndicator progress={1} status="ACTIVE" />)
  )
  .add('Complete, INACTIVE status', () =>
    setupStorybookAnalytics(<ProgressIndicator progress={1} status="INACTIVE" />)
  );
