import React from 'react';
import { IntlProvider } from 'react-intl';
import XFlowAnalyticsListener from '../../src/common/components/XFlowAnalyticsListener';

export default (spy, children) => <IntlProvider locale="en">
  <XFlowAnalyticsListener onEvent={spy}>
    {children}
  </XFlowAnalyticsListener>
</IntlProvider>;
