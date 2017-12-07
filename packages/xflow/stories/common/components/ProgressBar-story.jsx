import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import ProgressBar from '../../../src/common/components/ProgressBar';

import setupStorybookAnalytics from '../../helpers/setupStorybookAnalytics';

storiesOf('common/ProgressBar')
  .add('Empty Progress Bar', () => setupStorybookAnalytics(<ProgressBar progress={0} />))
  .add('25% Full', () => setupStorybookAnalytics(<ProgressBar progress={0.25} />))
  .add('50% Full', () => setupStorybookAnalytics(<ProgressBar progress={0.5} />))
  .add('Complete', () =>
    setupStorybookAnalytics(
      <ProgressBar progress={1} onComplete={action('ProgressBar onComplete')} />
    )
  )
  .add('Indeterminate state', () =>
    setupStorybookAnalytics(<ProgressBar progress={1} indeterminate />)
  )
  .add('Negative', () => setupStorybookAnalytics(<ProgressBar progress={-1} />))
  .add('Over 100%', () => setupStorybookAnalytics(<ProgressBar progress={2} />));
