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
    /** Key/values used to extend event data. */
    data?: Object,
    /** Function called to get the key/values used to extend event data.
    Occurs after event data has been extended with `data`. */
    getData?: (name: string, decoratedData: Object) => Object,
    /** String, regex, or function filter to limit what events are extended
    based on event name. String filters use exact matching unless they end
    with a '.', in which case a partial match on the beginning of the event
    name will be used.
    */
    match?: string | ((name: string) => boolean),
    /** Sets wether to extended private or public events. */
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
    // TODO: Remove wrapping <div> when we upgrade to React@16
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default AnalyticsDecorator;
