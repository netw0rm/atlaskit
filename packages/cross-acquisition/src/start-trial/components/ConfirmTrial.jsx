import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ConfirmTrial extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
  };

  render() {
    return (<div>
      <div>CONFIRM TRIAL</div>
      <button onClick={this.props.onComplete}>Next</button>
    </div>);
  }
}
