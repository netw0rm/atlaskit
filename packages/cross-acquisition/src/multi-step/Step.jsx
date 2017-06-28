import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Step extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
  }

  static contextTypes = {
    nextStep: PropTypes.func.isRequired,
  }

  nextStep = () => {
    this.context.nextStep();
  }

  render() {
    return this.props.render(this.nextStep);
  }
}
