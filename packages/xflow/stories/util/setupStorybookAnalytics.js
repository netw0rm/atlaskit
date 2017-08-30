import React from 'react';
import { action } from '@kadira/storybook';
import XFlowIntlProvider from '../../src/common/components/XFlowIntlProvider';
import XFlowAnalyticsListener from '../../src/common/components/XFlowAnalyticsListener';

const setupStorybookAnalytics = children =>
  <XFlowIntlProvider locale="en_US">
    <XFlowAnalyticsListener onEvent={action('onAnalyticsEvent')}>
      {children}
    </XFlowAnalyticsListener>
  </XFlowIntlProvider>;

export default setupStorybookAnalytics;
