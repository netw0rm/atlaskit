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
  state = {
    lastEvent: undefined,
  };

  onEvent = (eventName: string, eventData: Object) => {
    this.setState({
      lastEvent: {
        eventName: eventName,
        eventData: eventData
      }
    })
  }

  render() {
    const { lastEvent } = this.state;

    return (
     <AnalyticsListener onEvent={this.onEvent}>
        <AnalyticsDecorator data={{ time: Date.now() }}>
          <Button analyticsId="button" analyticsData={{ key: 'value' }}>Send Public Event</Button>
          <p>Last event sent: {!!lastEvent ? JSON.stringify(lastEvent) : 'None'}</p>
        </AnalyticsDecorator>
      </AnalyticsListener>
    );
  }
}
