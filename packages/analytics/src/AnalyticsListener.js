/* eslint-disable react/sort-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import matchEvent from './internal/matchEvent';

/*
The Listener component is responsible for calling its `onEvent` handler when a
child component fires an analytics event, and passing the event up the hierarchy
*/
class AnalyticsListener extends Component {
  props: {
    /** Function called when an event has been triggered within this
    listener. */
    onEvent: (eventName: string, eventData: Object) => any,
    /** String, regex, or function filter to limit what events call
    `onEvent` based on event name. String filters use exact matching
    unless they end with a '.', in which case a partial match on the beginning
    of the event name will be used. */
    match?: string | ((name: string) => boolean),
    /** Sets wether to call `onEvent` for private or public events. */
    matchPrivate?: boolean,
    /** Version of analytics event to listen for, useful when firing analytics
    in different event formats */
    matchVersion?: number,
  };
  static defaultProps = {
    match: '*',
    matchPrivate: false,
  };
  static contextTypes = {
    onAnalyticsEvent: PropTypes.func,
  };
  static childContextTypes = {
    onAnalyticsEvent: PropTypes.func,
  };
  getChildContext() {
    return {
      onAnalyticsEvent: this.onAnalyticsEvent,
    };
  }
  onAnalyticsEvent = (name: string, data: Object, isPrivate: boolean, version: number) => {
    // Call this component's onEvent method if it's a match
    const { onEvent, match, matchPrivate, matchVersion } = this.props;
    if (
      matchPrivate === isPrivate &&
      matchEvent(match, name) &&
      matchVersion === version &&
      typeof onEvent === 'function'
    ) {
      // send a clean data object so it can't be mutated between listeners
      const eventData = { ...data };
      onEvent(name, eventData);
    }

    // Pass the event up the hierarchy
    const { onAnalyticsEvent } = this.context;
    if (typeof onAnalyticsEvent === 'function') {
      onAnalyticsEvent(name, data, isPrivate, version);
    }
  };
  render() {
    const { children } = this.props; // eslint-disable-line react/prop-types
    return React.Children.only(children);
  }
}

export default AnalyticsListener;
