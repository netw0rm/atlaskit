import { storiesOf } from '@kadira/storybook';
import React from 'react';
import ProgressBar from '../src/progress-bar/components/ProgressBar';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';

storiesOf('ProgressBar')
  .add('Empty Progress Bar', () => setupStorybookAnalytics(<ProgressBar progress={0} />))
  .add('25% Full', () => setupStorybookAnalytics(<ProgressBar progress={0.25} />))
  .add('50% Full', () => setupStorybookAnalytics(<ProgressBar progress={0.5} />))
  .add('Complete', () =>
    setupStorybookAnalytics(
      <ProgressBar progress={1} onComplete={() => console.log('Progress completed')} />
    )
  )
  .add('Negative', () => setupStorybookAnalytics(<ProgressBar progress={-1} />))
  .add('Over 100%', () => setupStorybookAnalytics(<ProgressBar progress={2} />));
