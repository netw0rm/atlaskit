import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Step extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
  };

  static contextTypes = {
    nextStep: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
  };

  nextStep = (increment = 1) => {
    this.context.nextStep(increment);
  };

  cancel = () => {
    this.context.cancel();
  };

  render() {
    return this.props.render(this.nextStep, this.cancel);
  }
}
