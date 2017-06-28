import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GrantAccess extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
  };

  render() {
    return (<div>
      <div>GRANT ACCESS</div>
      <button onClick={this.props.onComplete}>Next</button>
    </div>);
  }
}
