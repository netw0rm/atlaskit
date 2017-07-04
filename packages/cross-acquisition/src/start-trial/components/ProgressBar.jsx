import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProgressBar extends Component {

  static propTypes = {
    progress: PropTypes.number,
  };

  render() {
    let x = 0
    let width = 0;
    if (this.props.progress && width > 0) {
      if (this.props.progress > 100) {
        width = 100;
      } else {
        width = this.props.progress;
      }
    }
    return (

      <div style={{ background: '#ebedf0', height: '6px', width: '100%', borderRadius: '3px' }}>
        <div style={{ background: '#162b4d', height: '6px', width: this.props.progress ? `${width}%` : 0, borderRadius: '3px' }} />
      </div>);
  }
}
