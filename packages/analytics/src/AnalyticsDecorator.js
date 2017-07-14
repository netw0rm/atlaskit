import React, { Component } from 'react';
import PropTypes from 'prop-types';

import matchEvent from './internal/matchEvent';

/*
The Decorator component extends analytics event data for any events fired by
its descendents, then passes the event up the hierarchy
*/
class AnalyticsDecorator extends Component {
  static propTypes = {
    data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    getData: PropTypes.func,
    match: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    matchPrivate: PropTypes.bool,
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
  onAnalyticsEvent = (name, srcData, isPrivate) => {
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
