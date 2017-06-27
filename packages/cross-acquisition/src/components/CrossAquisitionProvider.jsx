import { Component, Children } from 'react';
import PropTypes from 'prop-types';

import crossAcquisitionContextTypes from './prop-types/cross-acquisition-context-types';

export default class CrossAquisitionProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    ...crossAcquisitionContextTypes.crossAcquisition,
  };

  static childContextTypes = crossAcquisitionContextTypes;

  getChildContext() {
    return {
      crossAcquisition: {
        ...this.props,
      },
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}
