import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProgressBar extends Component {
  static propTypes = {
    progress: PropTypes.number,
  };

  render() {
    let width = 0;
    if (this.props.progress && this.props.progress > 0) {
      if (this.props.progress > 1) {
        width = 100;
      } else {
        width = this.props.progress * 100;
      }
    }
    return (
      <div style={{ background: '#ebedf0', height: '6px', width: '100%', borderRadius: '3px' }}>
        <div
          style={{
            background: '#162b4d',
            height: '6px',
            width: this.props.progress ? `${width}%` : 0,
            borderRadius: '3px',
            transition: 'width 7s linear',
          }}
        />
      </div>
    );
  }
}
