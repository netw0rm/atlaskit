import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import ProgressBar from '../../../src/common/components/ProgressBar';

import setupStorybookAnalytics from '../../helpers/setupStorybookAnalytics';

storiesOf('common/ProgressBar', module)
  .addDecorator(story => setupStorybookAnalytics(story()))
  .add('Empty Progress Bar', () =>
    <ProgressBar progress={0} />)
  .add('25% Full', () =>
    <ProgressBar progress={0.25} />
  )
  .add('50% Full', () =>
    <ProgressBar progress={0.5} />
  )
  .add('Complete', () =>
    <ProgressBar progress={1} onComplete={action('ProgressBar onComplete')} />
  )
  .add('Indeterminate state', () =>
    <ProgressBar progress={1} indeterminate />
  )
  .add('Negative', () =>
    <ProgressBar progress={-1} />
  )
  .add('Over 100%', () =>
    <ProgressBar progress={2} />
  );
