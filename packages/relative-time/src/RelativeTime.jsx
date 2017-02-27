import React, { PureComponent, PropTypes } from 'react';
import { FormattedRelative } from 'react-intl';

export default class RelativeTime extends PureComponent {
  static propTypes = {
    timestamp: PropTypes.number,
  }

  static defaultProps = {
    timestamp: '',
  }

  render() {
    return (
      <FormattedRelative
        value={this.props.timestamp}
        updateInterval={0}
      />
    );
  }
}
