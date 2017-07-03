import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProgressBar extends Component {

  static propTypes = {
    progress: PropTypes.number,
  };

  render() {
    return (

      <div style={{ background: '#ebedf0', height: '6px', width: '100%', borderRadius: '3px' }}>
        <div style={{ background: '#162b4d', height: '6px', width: this.props.progress ? `${this.props.progress}%` : 0, borderRadius: '3px' }} />
      </div>);
  }
}
