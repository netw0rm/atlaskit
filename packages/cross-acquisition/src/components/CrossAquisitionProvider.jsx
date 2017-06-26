import { Component, Children } from 'react';
import PropTypes from 'prop-types';

export default class CrossAquisitionProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    crossAcquisition: PropTypes.shape({
      productLogo: PropTypes.element,
      requestAccess: PropTypes.shape({
      }),
    }),
  }

  getChildContext() {
    return {};
  }

  render() {
    return Children.only(this.props.children);
  }
}
