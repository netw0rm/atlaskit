import React, { Component } from 'react';
import PropTypes from 'prop-types';

import matchEvent from './internal/matchEvent';

/*
The Listener component is responsible for calling its `onEvent` handler when a
child component fires an analytics event, and passing the event up the hierarchy
*/
class AnalyticsListener extends Component {
  static propTypes = {
    onEvent: PropTypes.func.isRequired,
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
  onAnalyticsEvent = (name, data, isPrivate) => {
    // Call this component's onEvent method if it's a match
    const { onEvent, match, matchPrivate } = this.props;
    if (
      matchPrivate === isPrivate &&
      matchEvent(match, name) &&
      typeof onEvent === 'function'
    ) {
      // send a clean data object so it can't be mutated between listeners
      const eventData = { ...data };
      onEvent(name, eventData);
    }

    // Pass the event up the hierarchy
    const { onAnalyticsEvent } = this.context;
    if (typeof onAnalyticsEvent === 'function') {
      onAnalyticsEvent(name, data, isPrivate);
    }
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

export default AnalyticsListener;
