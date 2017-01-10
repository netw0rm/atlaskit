import React, { PureComponent, PropTypes } from 'react';
import AkBadge from 'ak-badge';

export default class RandomBadge extends PureComponent {
  static propTypes = {
    theme: PropTypes.string,
  }

  static defaultProps = {
    theme: 'default',
  }

  render() {
    const badgeNumber = Math.random() > 0.3 ? (Math.round(Math.random() * 200)) : 0;

    return badgeNumber > 0 ?
      (<AkBadge
        appearance={Math.random() > 0.5 ? 'primary' : null}
        value={badgeNumber}
        theme={this.props.theme}
      />) : null;
  }
}

