import React from 'react';
import { action } from '@kadira/storybook';
import { AnalyticsListener } from '../../src/common/components/Analytics';
import { IntlProvider } from 'react-intl';
import languagePacks from '../../src/language-packs.json';

const setupStorybookAnalytics = children =>
  <IntlProvider locale="en" messages={languagePacks['en-US']}>
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
