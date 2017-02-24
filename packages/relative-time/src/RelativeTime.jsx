import React, { PureComponent, PropTypes } from 'react';
import TimeAgo from 'react-timeago';

export default class RelativeTime extends PureComponent {
  static propTypes = {
    formatter: PropTypes.func,
    timestamp: PropTypes.number,
  }

  static defaultProps = {
    timestamp: '',
  }

  render() {
    return (
      <TimeAgo
        date={this.props.timestamp}
        formatter={this.props.formatter}
        live={false}
      />
    );
  }
}
