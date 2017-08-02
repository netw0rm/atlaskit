import React from 'react';
import { action } from '@kadira/storybook';
import { IntlProvider } from 'react-intl';
import languagePacks from '../../src/language-packs.json';
import XFlowAnalyticsListener from '../../src/common/components/XFlowAnalyticsListener';

const setupStorybookAnalytics = children =>
  <IntlProvider locale="en" messages={languagePacks['en-US']}>
    <XFlowAnalyticsListener onEvent={action('onAnalyticsEvent')}>
    {children}
    </XFlowAnalyticsListener>
  </IntlProvider>;

export default setupStorybookAnalytics;
