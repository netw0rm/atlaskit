import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
The withAnalytics HOC wraps a component and provides the `fireAnalyticsEvent`
and `firePrivateAnalyticsEvent` methods to it as props. It contains the logic
for how to fire events, including handling the analyticsId and analyticsData
props. The `map` argument may be an object or a function that returns an object.
The properties of the `map` object/result can be strings (the name of the event
that will be fired) or functions (which are responsible for firing the event)
*/
const withAnalytics = (WrappedComponent, map = {}) =>
  class WithAnalytics extends Component {
    static displayName = `WithAnalytics(${WrappedComponent.displayName ||
      WrappedComponent.name})`;
    static contextTypes = { onAnalyticsEvent: PropTypes.func };
    static propTypes = {
      analyticsId: PropTypes.string,
      analyticsData: PropTypes.any, // eslint-disable-line react/forbid-prop-types
      analyticsDelay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    };
    componentWillMount() {
      this.evaluatedMap =
        typeof map === 'function' ? map(this.fireAnalyticsEvent) : map;
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
      /* eslint-disable no-unused-vars */
      const {
        analyticsId,
        analyticsData,
        analyticsDelay,
        ...componentProps
      } = this.props;
      /* eslint-enable no-unused-vars */
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

export default withAnalytics;
