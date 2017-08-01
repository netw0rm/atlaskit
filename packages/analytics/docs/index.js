import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import BasicExample from './BasicExample';
import BasicExampleSrc from '!raw-loader!./BasicExample';

import MatchExample from './MatchExample';
import MatchExampleSrc from '!raw-loader!./MatchExample';

import WrappingExample from './WrappingExample';
import WrappingExampleSrc from '!raw-loader!./WrappingExample';

import IntegratingExample from './IntegratingExample';
import IntegratingExampleSrc from '!raw-loader!./IntegratingExample';
/* eslint-enable import/no-duplicates, import/first */

const Usage = styled.pre`
  background-color: #f4f5f7;
  border-radius: 5px;
  margin: 14px 0;
  padding: 8px;
`;

export const description = (
  <div>
    <p>
      The analytics package exports several components and functions that work together
      to enable other components to fire analytics, extend event data, and process events.
    </p>
    <Usage>{`import {
  AnalyticsDecorator, AnalyticsListener, cleanProps, withAnalytics
} from '@atlaskit/analytics'`}</Usage>
    <p>
      Using this library components can fire public and private events:
    </p>
    <ul>
      <li>Public events should be used by component consumers to track how customers are
      using their application.</li>
      <li>Private events should be used by component authors to monitor how customers are
      using their components.</li>
    </ul>
    <p>
      Components that want to fire private events and support public events for consumers
      will need to be wrapped using the <code>withAnalytics</code> higher-order component.
      This will provide the wrapped component with several props that should be filtered
      out using the <code>cleanProps</code> function before passing to any children.
    </p>
    <p>
      As a general guideline component authors should follow the
      &apos;Integrating Components&apos; example to add both public and private events. For
      these components consumers should only need to set the <code>analyticsId</code> for
      public events to fire. If a consumer finds a component that does not have analytics
      they can call <code>fireAnalyticsEvent</code> in their component or look at the
      &apos;Wrapping Components&apos; example.
    </p>
    <p>
      <code>AnalyticsDecorator</code> can be used to extend the event data of child
      components. It can be configured to only intercept certain events based on event name
      and/or type (public or private). Decorators can also be nested within one another
      enabling different combinations of filtering and extending. With this events will
      continue to bubble up to the next decorator in the hierarchy.
    </p>
    <p>
      <code>AnalyticsListener</code> is used to capture child events for processing
      (e.g. sending to a web service). Similarly to <code>AnalyticsDecorator</code> it
      has options for filtering (event name and type) and can be nested within other listeners.
    </p>
    <p>
      Open up the browser console to see the analytic events in the examples.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Usage',
    Component: BasicExample,
    src: BasicExampleSrc,
  },
  {
    title: 'Integrating Components',
    Component: IntegratingExample,
    src: IntegratingExampleSrc,
  },
  {
    title: 'Wrapping Components',
    Component: WrappingExample,
    src: WrappingExampleSrc,
  },
  {
    title: 'Match Filtering',
    Component: MatchExample,
    src: MatchExampleSrc,
  },
];
