import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import GatewayRegistry from './GatewayRegistry';

export default class GatewayDest extends Component {
  static contextTypes = {
    gatewayRegistry: PropTypes.instanceOf(GatewayRegistry).isRequired,
  };
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
  };
  static defaultProps = {
    component: 'div',
  };

  constructor(props, context) {
    super(props, context);
    this.gatewayRegistry = context.gatewayRegistry;
  }

  state = { children: null };

  componentWillMount() {
    this.gatewayRegistry.addContainer(this.props.name, this);
  }
  componentWillUnmount() {
    this.gatewayRegistry.removeContainer(this.props.name, this);
  }
  render() {
    const { component, ...attrs } = this.props;
    delete attrs.name;

    return createElement(component, attrs, this.state.children);
  }
}
