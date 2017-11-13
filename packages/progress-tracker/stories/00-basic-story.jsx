import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';
import Page from '@atlaskit/page';
import ProgressTrackerOverviewHref from './examples/ProgressTrackerOverviewHref';
import ProgressTrackerOverviewOnClick from './examples/ProgressTrackerOverviewOnClick';
import TwoStepProgressTracker from './examples/TwoStepProgressTracker';
import SpacingProgressTracker from './examples/SpacingProgressTracker';
import CustomLinkComponent from './examples/CustomLinkComponent';

storiesOf(name, module)
  .addCodeExampleStory('Six Step Progress Tracker with href', () => (
    <Page>
      {ProgressTrackerOverviewHref}
    </Page>
  ))
  .addCodeExampleStory('Six Step Progress Tracker with onClick', () => (
    <Page>
      {ProgressTrackerOverviewOnClick}
    </Page>
  ))
  .addCodeExampleStory('Two Step Progress Tracker', () => (
    <Page>
      {TwoStepProgressTracker}
    </Page>
  ))
  .addCodeExampleStory('Spacing Options', () => (
    <Page>
      {SpacingProgressTracker}
    </Page>
  ))
  .addCodeExampleStory('Custom Link Component', () => (
    <Page>
      {CustomLinkComponent}
    </Page>
  ));
