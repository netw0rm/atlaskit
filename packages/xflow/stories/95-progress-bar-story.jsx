import { storiesOf } from '@kadira/storybook';
import React from 'react';
import ProgressBar from '../src/start-trial/components/ProgressBar';

import setupStorybookAnalytics from './util/setupStorybookAnalytics';

storiesOf('ProgressBar')
  .add('Empty Progress Bar', () => setupStorybookAnalytics(
    <ProgressBar />
  ))
  .add('25% Full', () => setupStorybookAnalytics(
    <ProgressBar progress={25} />
  ))
  .add('Complete', () => setupStorybookAnalytics(
    <ProgressBar progress={100} />
  ))
  .add('Negative', () => setupStorybookAnalytics(
    <ProgressBar progress={-100} />
  ))
  .add('Over 100', () => setupStorybookAnalytics(
    <ProgressBar progress={200} />
  ));
