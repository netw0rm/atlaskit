/* eslint-disable react/sort-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import matchEvent from './internal/matchEvent';

/*
The Decorator component extends analytics event data for any events fired by
its descendents, then passes the event up the hierarchy
*/
class AnalyticsDecorator extends Component {
  props: {
    data?: Object,
    getData?: (name: string, decoratedData: Object) => Object,
    match?: string | ((name: string) => boolean),
    matchPrivate?: boolean,
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
  onAnalyticsEvent = (name: string, srcData: Object, isPrivate: boolean) => {
    // Check there is a listener to pass the event to, otherwise there's no need
    // to do any of this work
    const { onAnalyticsEvent } = this.context;
    if (typeof onAnalyticsEvent !== 'function') return;

    // Decorate the event data if this decorator matches the event name
    const { data, getData, match, matchPrivate } = this.props;
    const decoratedData = { ...srcData };
    if (matchPrivate === isPrivate && matchEvent(match, name)) {
      if (typeof data === 'object') {
        Object.assign(decoratedData, data);
      }
      if (typeof getData === 'function') {
        Object.assign(decoratedData, getData(name, decoratedData));
      }
    }
    // Pass the decorated event data to the next listener up the hierarchy
    onAnalyticsEvent(name, decoratedData, isPrivate);
  };
  render() {
    const { children } = this.props; // eslint-disable-line react/prop-types
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default AnalyticsDecorator;
