import { Component } from 'react';
import PropTypes from 'prop-types';

export default class MultiStep extends Component {
  static propTypes = {
    children: PropTypes.node,
    start: PropTypes.number,
  }

  static childContextTypes = {
    nextStep: PropTypes.func,
  }

  state = {
    step: this.props.start || 0,
  }

  getChildContext() {
    return {
      nextStep: this.nextStep,
    };
  }

  nextStep = () => {
    this.setState({
      step: this.state.step + 1,
    });
  }

  render() {
    return this.props.children[this.state.step];
  }
}
