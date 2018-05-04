import { Component } from 'react';
import PropTypes from 'prop-types';

export default class MultiStep extends Component {
  static propTypes = {
    children: PropTypes.node,
    start: PropTypes.number,
    onComplete: PropTypes.func,
  };

  static defaultProps = {
    onComplete: () => {},
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

  componentDidUpdate() {
    if (!this.props.children[this.state.step]) {
      // note: passing the step allow to discriminate between cancel / complete
      this.props.onComplete(this.state.step);
    }
  }

  nextStep = (increment = 1) => {
    // Note: should only happen during dev when invoking incorrectly
    if (!Number.isInteger(increment)) { throw new Error('MultiStep: nextStep(n) was passed a non-integer, check your code!'); }
    if (!Number.isInteger(this.state.step)) { throw new Error('MultiStep: state.step is not an integer, check the "start" prop!'); }

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
