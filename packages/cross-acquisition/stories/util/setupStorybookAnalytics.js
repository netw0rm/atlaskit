import React from 'react';
import { action } from '@kadira/storybook';
import { AnalyticsListener } from '../../src/common/components/Analytics';

const setupStorybookAnalytics = children => (
  <AnalyticsListener onEvent={action('AnalyticsListener::onEvent')} match="growth">
    <div>
      {children}
    </div>
  </AnalyticsListener>
  );

export default setupStorybookAnalytics;
