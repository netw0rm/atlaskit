import React, { PureComponent, PropTypes } from 'react';
import moment from 'moment';

export default class RelativeTime extends PureComponent {
  static propTypes = {
    locale: PropTypes.string,
    timestamp: PropTypes.number,
  }

  static defaultProps = {
    locale: 'en',
    timestamp: '',
  }

  render() {
    const time = moment(this.props.timestamp);
    return (
      <span>
        {time.locale(this.props.locale).fromNow()}
      </span>
    );
  }
}
