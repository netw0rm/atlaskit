import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GatewayRegistry from './GatewayRegistry';

export default class GatewayProvider extends Component {
  static childContextTypes = {
    gatewayRegistry: PropTypes.instanceOf(GatewayRegistry).isRequired,
  }
  static propTypes = {
    children: PropTypes.node.isRequired,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
  }
  static defaultProps = {
    component: 'div',
  }

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
    const { children, component: Tag } = this.props;

    return <Tag>{children}</Tag>;
  }
}
