import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoadingTime extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
  };

  render() {
    return (<div>
      <div>LOADING TIME</div>
      <button onClick={this.props.onComplete}>Next</button>
    </div>);
  }
}
