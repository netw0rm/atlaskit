import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { xFlowShape } from '../../common/components/XFlowProvider';
import App from '../../common/components/App';

import AdminSettings from './AdminSettings';

export default class OptOut extends Component {
  static contextTypes = {
    xFlow: xFlowShape,
  };

  static propTypes = {
    locale: PropTypes.string,
  };

  render() {
    return (
      <App>
        <AdminSettings />
      </App>
    );
  }
}
