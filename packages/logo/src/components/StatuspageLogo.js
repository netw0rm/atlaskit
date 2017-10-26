import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StatuspageIconAndWordmark from './StatuspageIconAndWordmark';
import StatuspageIcon from './StatuspageIcon';
import StatuspageWordmark from './StatuspageWordmark';

export default class StatuspageLogo extends Component {
  static propTypes = {
    /** If set, the logo will be collapsed down to show only the product icon or product type */
    collapseTo: PropTypes.oneOf(['icon', 'type']),
  }

  render() {
    const { collapseTo, ...props } = this.props;
    let Variant = StatuspageIconAndWordmark;
    if (collapseTo === 'icon') {
      Variant = StatuspageIcon;
    } else if (collapseTo === 'type') {
      Variant = StatuspageWordmark;
    }
    return <Variant {...props} />;
  }
}
