import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import PublicEventExample from './PublicEventExample';
import publicEventExampleSrc from '!raw-loader!./PublicEventExample';

import PrivateEventExample from './PrivateEventExample';
import privateEventExampleSrc from '!raw-loader!./PrivateEventExample';
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
  </div>
);

export const examples = [
  {
    title: 'Public Event',
    Component: PublicEventExample,
    src: publicEventExampleSrc,
  },
  {
    title: 'Private Event',
    Component: PrivateEventExample,
    src: privateEventExampleSrc,
  },
];
