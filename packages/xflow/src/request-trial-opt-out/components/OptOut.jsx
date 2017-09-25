import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { xFlowShape } from '../../common/components/XFlowProvider';
import XFlowAnalyticsListener from '../../common/components/XFlowAnalyticsListener';

import AdminSettings from './AdminSettings';

export default class OptOut extends Component {
  static contextTypes = {
    xFlow: xFlowShape,
  };

  static propTypes = {
    onAnalyticsEvent: PropTypes.func.isRequired,
  };

  handleAnalyticsEvent = (name, data) => {
    const { onAnalyticsEvent } = this.props;
    if (onAnalyticsEvent) {
      onAnalyticsEvent(name, {
        ...data,
      });
    }
  };

  render() {
    return (
      <XFlowAnalyticsListener onEvent={this.handleAnalyticsEvent}>
        <AdminSettings
          id="xflow-opt-out-dialog"
          {...this.props}
        />
      </XFlowAnalyticsListener>
    );
  }
}
