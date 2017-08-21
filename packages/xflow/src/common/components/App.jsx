import React, { Component } from 'react';
import PropTypes from 'prop-types';
import XFlowAnalyticsListener from '../components/XFlowAnalyticsListener';

const noop = () => {};

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    onAnalyticsEvent: PropTypes.func,
  };

  render() {
    const { onAnalyticsEvent } = this.props;
    return (
      <XFlowAnalyticsListener onEvent={onAnalyticsEvent || noop}>
        {this.props.children}
      </XFlowAnalyticsListener>
    );
  }
}
