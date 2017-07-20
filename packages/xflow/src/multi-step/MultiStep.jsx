import { Component } from 'react';
import PropTypes from 'prop-types';

export default class MultiStep extends Component {
  static propTypes = {
    children: PropTypes.node,
    start: PropTypes.number,
  };

  static childContextTypes = {
    nextStep: PropTypes.func,
    cancel: PropTypes.func,
  };

  state = {
    step: this.props.start || 0,
  };

  getChildContext() {
    return {
      nextStep: this.nextStep,
      cancel: this.cancel,
    };
  }

  nextStep = (increment = 1) => {
    this.setState({
      step: this.state.step + increment,
    });
  };

  cancel = () => {
    this.setState({
      step: -1,
    });
  };

  render() {
    return this.props.children[this.state.step] || null;
  }
}
