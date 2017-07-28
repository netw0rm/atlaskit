import React, { Component } from 'react';

import {
  AnalyticsDecorator,
  AnalyticsListener,
  cleanProps,
  withAnalytics,
} from '../src';

const Button = withAnalytics(
  class T extends Component {
    onClick = (e) => {
      const { firePrivateAnalyticsEvent } = this.props;
      firePrivateAnalyticsEvent('private.button.click', { key: 'value' });
      if (this.props.onClick) this.props.onClick(e);
    };
    render() {
      const { children, ...props } = this.props;
      return (
        <button {...cleanProps(props)} onClick={this.onClick}>
          {children}
        </button>
      );
    }
  }  
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
     <AnalyticsListener onEvent={this.onEvent} matchPrivate>
        <AnalyticsDecorator data={{ time: Date.now() }} matchPrivate>
          <Button analyticsId="button" analyticsData={{ key: 'value' }}>Send Private Event</Button>
          <p>Last event sent: {!!lastEvent ? JSON.stringify(lastEvent) : 'None'}</p>
        </AnalyticsDecorator>
      </AnalyticsListener>
    );
  }
}
