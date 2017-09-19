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
    sourceComponent: PropTypes.string.isRequired,
    sourceContext: PropTypes.string.isRequired,
    onAnalyticsEvent: PropTypes.func.isRequired,
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
        <AdminSettings {...this.props} />
      </XFlowAnalyticsListener>
    );
  }
}
