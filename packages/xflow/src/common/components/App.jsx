import React, { Component } from 'react';
import PropTypes from 'prop-types';
import XFlowAnalyticsListener from '../components/XFlowAnalyticsListener';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    onAnalyticsEvent: PropTypes.func,
    sourceComponent: PropTypes.string,
    sourceContext: PropTypes.string,
  };

  handleAnalyticsEvent = (name, data) => {
    const { onAnalyticsEvent, sourceComponent, sourceContext } = this.props;
    if (onAnalyticsEvent) {
      onAnalyticsEvent(name, {
        ...data,
        sourceComponent,
        sourceContext,
      });
    }
  };

  render() {
    return (
      <XFlowAnalyticsListener onEvent={this.handleAnalyticsEvent}>
        {this.props.children}
      </XFlowAnalyticsListener>
    );
  }
}
