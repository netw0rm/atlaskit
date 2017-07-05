import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { crossSellShape } from '../../common/components/CrossSellProvider';
import AppBase from '../../common/components/AppBase';

import AdminSettings from './AdminSettings';

export default class OptOut extends Component {
  static contextTypes = {
    crossSell: crossSellShape,
  };

  static propTypes = {
    locale: PropTypes.string,
  };

  static defaultProps = {
    locale: 'en_US',
  };

  render() {
    return (
      <AppBase locale={this.props.locale}>
        <AdminSettings />
      </AppBase>
    );
  }
}
