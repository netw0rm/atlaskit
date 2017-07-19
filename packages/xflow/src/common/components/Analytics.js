import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
 The matchEvent method is responsible for deciding whether a Decorator or
 Listener should take action based on the event name and the `match` prop.
 */
function matchEvent(match, name) {
  if (match === '*') return true;
  else if (typeof match === 'function') {
    return match(name);
  } else if (typeof match === 'string') {
    return name.substr(0, match.length) === match;
  } else if (match instanceof RegExp) {
    return match.test(name);
  }
  return false;
}

/*
 The Base class abstracts common aspects of the Listener and Decorator classes
 */
class AnalyticsListenerBase extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static childContextTypes = {
    onAnalyticsEvent: PropTypes.func,
  };
  static contextTypes = {
    onAnalyticsEvent: PropTypes.func,
  };
  static defaultProps = {
    match: '*',
    matchPrivate: false,
  };
  getChildContext() {
    return {
      onAnalyticsEvent: this.onAnalyticsEvent,
    };
  }
  render() {
    const { children } = this.props;
    return children;
  }
}

/*
 The Listener component is responsible for calling its `onEvent` handler when a
 child component fires an analytics event, and passing the event up the hierarchy
 */
export class AnalyticsListener extends AnalyticsListenerBase {
  static propTypes = {
    onEvent: PropTypes.func.isRequired,
    match: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    matchPrivate: PropTypes.bool,
  };
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
}

/*
 The Decorator component extends analytics event data for any events fired by
 its descendents, then passes the event up the hierarchy
 */
export class AnalyticsDecorator extends AnalyticsListenerBase {
  static propTypes = {
    data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    getData: PropTypes.func,
    match: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    matchPrivate: PropTypes.bool,
  };
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
}

/*
 cleanProps removes props added by the withAnalytics HOC from an object
 */
export const cleanProps = (props) => {
  const {
    fireAnalyticsEvent, // eslint-disable-line no-unused-vars
    firePrivateAnalyticsEvent, // eslint-disable-line no-unused-vars
    ...otherProps
  } = props;
  return otherProps;
};

/*
 The withAnalytics HOC wraps a component and provides the `fireAnalyticsEvent`
 and `firePrivateAnalyticsEvent` methods to it as props. It contains the logic
 for how to fire events, including handling the analyticsId and analyticsData
 props. The `map` argument may be an object or a function that returns an object.
 The properties of the `map` object/result can be strings (the name of the event
 that will be fired) or functions (which are responsible for firing the event)
 */
export const withAnalytics = (WrappedComponent, map = {}) =>
  // eslint-disable-next-line react/no-multi-comp
  class WithAnalytics extends Component {
    static displayName = `WithAnalytics(${WrappedComponent.displayName ||
    WrappedComponent.name})`;
    static contextTypes = { onAnalyticsEvent: PropTypes.func };
    static propTypes = {
      analyticsId: PropTypes.string,
      analyticsData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
      analyticsDelay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    };
    componentWillMount() {
      this.evaluatedMap = typeof map === 'function'
        ? map(this.fireAnalyticsEvent)
        : map;
    }
    fireAnalyticsEvent = (name, data) => {
      const { analyticsId, analyticsDelay } = this.props;
      const { onAnalyticsEvent } = this.context;
      if (!analyticsId || !onAnalyticsEvent) return;
      const fireEvent = () => {
        const { analyticsData } = this.props;
        const eventData = { ...analyticsData, ...data };
        onAnalyticsEvent(`${analyticsId}.${name}`, eventData, false);
      };
      if (analyticsDelay) {
        setTimeout(fireEvent, analyticsDelay === true ? 0 : analyticsDelay);
      } else {
        fireEvent();
      }
    };
    privateAnalyticsEvent = (name, data) => {
      const { onAnalyticsEvent } = this.context;
      if (!onAnalyticsEvent) return;
      onAnalyticsEvent(`${name}`, data, true);
    };
    render() {
      const {
        analyticsId, // eslint-disable-line no-unused-vars
        analyticsData, // eslint-disable-line no-unused-vars
        analyticsDelay, // eslint-disable-line no-unused-vars
        ...componentProps
      } = this.props;
      Object.keys(this.evaluatedMap).forEach((prop) => {
        const handler = this.evaluatedMap[prop]; // may be eventName or a function
        const originalProp = componentProps[prop];
        componentProps[prop] = (...args) => {
          if (typeof handler === 'function') {
            handler(...args);
          } else {
            this.fireAnalyticsEvent(handler);
          }
          if (typeof originalProp === 'function') originalProp(...args);
        };
      });
      return (
        <WrappedComponent
          fireAnalyticsEvent={this.fireAnalyticsEvent}
          firePrivateAnalyticsEvent={this.privateAnalyticsEvent}
          {...componentProps}
        />
      );
    }
  };
