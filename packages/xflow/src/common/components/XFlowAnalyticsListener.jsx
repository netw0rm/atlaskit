import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AnalyticsListener } from '@atlaskit/analytics';

export default class XFlowAnalyticsListener extends Component {
  static propTypes = {
    onEvent: PropTypes.func.isRequired,
    children: PropTypes.node,
  }
  render() {
    const { onEvent, children } = this.props;
    return (<AnalyticsListener matchPrivate match="xflow." onEvent={onEvent}>
      { children }
    </AnalyticsListener>);
  }
}
