import React from 'react';
import { action } from '@kadira/storybook';
import { AnalyticsListener } from '../../src/common/components/Analytics';
import { IntlProvider } from 'react-intl';
import mockMessageProxy from './mockMessageProxy';

const setupStorybookAnalytics = children =>
  <IntlProvider locale="en" messages={mockMessageProxy}>
    <AnalyticsListener
      onEvent={action('AnalyticsListener::onEvent')}
      match="xflow"
      matchPrivate
    >
      <div>
        {children}
      </div>
    </AnalyticsListener>
  </IntlProvider>;

export default setupStorybookAnalytics;
