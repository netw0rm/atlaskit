import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { xFlowShape } from '../../common/components/XFlowProvider';
import XFlowAnalyticsListener from '../../common/components/XFlowAnalyticsListener';

import AdminSettings from './AdminSettings';

class OptOut extends Component {
  static contextTypes = {
    xFlow: xFlowShape,
  };

  render() {
    return (
      <AdminSettings
        id="xflow-opt-out-dialog"
        {...this.props}
      />
    );
  }
}

function OptOutWrap01({ onAnalyticsEvent, ...props }) {
  return (
    <XFlowAnalyticsListener onEvent={onAnalyticsEvent}>
      <OptOut {...props} />
    </XFlowAnalyticsListener>
  );
}
OptOutWrap01.propTypes = {
  onAnalyticsEvent: PropTypes.func,
};

export default OptOutWrap01;
