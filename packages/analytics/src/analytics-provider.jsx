import { Component, PropTypes } from 'react';

export default class AnalyticsProvider extends Component {
  static propTypes = {
    onEvent: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    triggerAnalytics: PropTypes.func,
  };

  getChildContext() {
    return {
      triggerAnalytics: this.props.onEvent,
    };
  }

  render() {
    return this.props.children;
  }
}
