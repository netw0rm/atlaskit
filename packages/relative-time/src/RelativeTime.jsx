import React, { PureComponent, PropTypes } from 'react';
import IntlRelativeFormat from 'intl-relativeformat';

export default class RelativeTime extends PureComponent {
  static propTypes = {
    locale: PropTypes.string,
    timestamp: PropTypes.number,
  }

  static defaultProps = {
    timestamp: '',
  }

  render() {
    const rf = new IntlRelativeFormat(this.props.locale);
    return (
      <time>{rf.format(this.props.timestamp)}</time>
    );
  }
}
