import React, { Component } from 'react';
import {
  AnalyticsDecorator,
  AnalyticsListener,
  cleanProps,
  withAnalytics,
} from '../src';

const Button = withAnalytics(
  ({ children, ...props }) =>
    <button {...cleanProps(props)}>
      {children}
    </button>,
  { onClick: 'click' }
);

export default class AnalyticsExample extends Component {
  render() {
    return (
      <AnalyticsListener
        onEvent={(eventName, eventData) => {
          console.log(eventName, eventData);
        }}
      >
        <AnalyticsDecorator data={{ time: Date.now() }}>
          <Button analyticsId="button">Send Analytics</Button>
        </AnalyticsDecorator>
      </AnalyticsListener>
    );
  }
}
