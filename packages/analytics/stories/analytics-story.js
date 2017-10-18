import { storiesOf } from '@kadira/storybook';
import React from 'react';

import {
  AnalyticsDecorator,
  AnalyticsListener,
  cleanProps,
  withAnalytics,
} from '../src/index';

import { name } from '../package.json';

const Button = withAnalytics(
   /* eslint-disable no-unused-vars*/
  ({ getParentAnalyticsData, children, ...props }) =>
    <button {...cleanProps(props)}>
      {children}
    </button>,
  { onClick: 'click' }
);

function handleAnalyticsEvent(eventName, eventData) {
  console.log('Analytics Event:', eventName, eventData);
}

storiesOf(name, module)
  .add('decorating data using function', () =>
    <AnalyticsListener onEvent={handleAnalyticsEvent}>
      <AnalyticsDecorator
        getData={(analyticsId, analyticsData) => {
          if (analyticsId === 'button.click' && analyticsData.one === 1) {
            return { one: 2, two: 2 };
          }
          return {};
        }}
      >
        <Button analyticsId="button" analyticsData={{ one: 1 }}>
          Send analytics
        </Button>
      </AnalyticsDecorator>
    </AnalyticsListener>
  )
  .add('match filtering using string', () =>
    <AnalyticsListener onEvent={handleAnalyticsEvent} match="button.full.click">
      <AnalyticsDecorator data={{ time: Date.now() }} match="button.full.click">
        <Button analyticsId="button.full">
          Send analytics
        </Button>
      </AnalyticsDecorator>
    </AnalyticsListener>
  )
  .add('match filtering using partial string', () =>
    <AnalyticsListener onEvent={handleAnalyticsEvent} match="button.">
      <AnalyticsDecorator data={{ time: Date.now() }} match="button.">
        <Button analyticsId="button.partial">
          Send analytics
        </Button>
      </AnalyticsDecorator>
    </AnalyticsListener>
  )
  .add('match filtering using regex', () =>
    <AnalyticsListener onEvent={handleAnalyticsEvent} match={/regex.*/}>
      <AnalyticsDecorator data={{ time: Date.now() }} match={/regex.*/}>
        <Button analyticsId="button.regex">
          Send analytics
        </Button>
      </AnalyticsDecorator>
    </AnalyticsListener>
  )
  .add('match filtering using function', () =>
    <AnalyticsListener
      onEvent={handleAnalyticsEvent}
      match={analyticsId => analyticsId === 'button.function.click'}
    >
      <AnalyticsDecorator
        data={{ time: Date.now() }}
        match={analyticsId => analyticsId === 'button.function.click'}
      >
        <Button analyticsId="button.function">
          Send analytics
        </Button>
      </AnalyticsDecorator>
    </AnalyticsListener>
  )
;
