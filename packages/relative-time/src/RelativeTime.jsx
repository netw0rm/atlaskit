import React, { PureComponent, PropTypes } from 'react';
import { FormattedRelative, IntlProvider } from 'react-intl';

export default class RelativeTime extends PureComponent {
  static propTypes = {
    timestamp: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }

  static contextTypes = {
    intl: PropTypes.object,
  }

  static defaultProps = {
    timestamp: '',
  }

  render() {
    const Relative = () => (
      <FormattedRelative
        value={this.props.timestamp}
        updateInterval={0}
      />
    );

    return (this.context.intl ?
      <Relative /> :
      <IntlProvider locale="en">
        <Relative />
      </IntlProvider>
    );
  }
}
