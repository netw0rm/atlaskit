import { Component } from 'react';
import PropTypes from 'prop-types';
import SpotlightRegistry from './SpotlightRegistry';

export default class SpotlightManager extends Component {
  static childContextTypes = {
    spotlightRegistry: PropTypes.instanceOf(SpotlightRegistry).isRequired,
  };

  static propTypes = {
    children: PropTypes.element,
  };

  constructor(props, context) {
    super(props, context);
    this.spotlightRegistry = new SpotlightRegistry();
  }

  getChildContext() {
    return {
      spotlightRegistry: this.spotlightRegistry,
    };
  }

  render() {
    return this.props.children;
  }
}
