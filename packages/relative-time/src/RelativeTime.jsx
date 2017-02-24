import React, { PureComponent, PropTypes } from 'react';
import dateFns from 'date-fns';

export default class RelativeTime extends PureComponent {
  static propTypes = {
    locale: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    timestamp: PropTypes.number,
  }

  static defaultProps = {
    locale: 'en',
    timestamp: '',
  }

  render() {
    return (
      <span>
        {dateFns.distanceInWordsToNow(
          new Date(this.props.timestamp), {
            addSuffix: true,
            includeSeconds: true,
            locale: this.props.locale,
          }
        )}
      </span>
    );
  }
}
