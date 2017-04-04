import React, { Component, PropTypes } from 'react';

export default mapTriggerToProps => (InnerComponent) => {
  class WithAnalyticsWrapper extends Component {
    static propTypes = {
      externalId: PropTypes.string,
      externalValues: PropTypes.objectOf(PropTypes.any),
    };

    static contextTypes = {
      triggerAnalytics: PropTypes.func,
    };

    static WrappedComponent = InnerComponent;

    componentWillMount() {
      if (!this.shouldTrigger()) {
        return;
      }

      const trigger = (type, payload) => {
        this.context.triggerAnalytics({
          externalId: this.props.externalId,
          type,
          payload: {
            ...payload,
            ...this.props.externalValues,
          },
        });
      };

      const triggerProps = mapTriggerToProps(trigger);
      this.proxiedProps = {};
      Object.keys(triggerProps).forEach((name) => {
        const callback = triggerProps[name];
        this.proxiedProps[name] = (...args) => {
          callback(...args);
          if (this.props[name]) {
            this.props[name](...args);
          }
        };
      });
    }

    shouldTrigger() {
      return this.context && this.context.triggerAnalytics && this.props.externalId;
    }

    render() {
      const innerProps = {
        ...this.props,
        ...this.proxiedProps,
      };
      return <InnerComponent {...innerProps} />;
    }
  }

  return WithAnalyticsWrapper;
};
