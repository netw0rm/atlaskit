import { Component } from 'react';
import PropTypes from 'prop-types';
import GatewayRegistry from './GatewayRegistry';

export default class GatewayProvider extends Component {
  static childContextTypes = {
    gatewayRegistry: PropTypes.instanceOf(GatewayRegistry).isRequired,
  }

  static propTypes = {
    children: PropTypes.element,
  };

  constructor(props, context) {
    super(props, context);
    this.gatewayRegistry = new GatewayRegistry();
  }

  getChildContext() {
    return {
      gatewayRegistry: this.gatewayRegistry,
    };
  }

  render() {
    return this.props.children;
  }
}
