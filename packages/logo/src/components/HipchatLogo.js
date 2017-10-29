import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HipchatIconAndWordmark from './HipchatIconAndWordmark';
import HipchatIcon from './HipchatIcon';
import HipchatWordmark from './HipchatWordmark';

export default class HipchatLogo extends Component {
  static propTypes = {
    /** If set, the logo will be collapsed down to show only the product icon or product type */
    collapseTo: PropTypes.oneOf(['icon', 'type']),
  }

  render() {
    const { collapseTo, ...props } = this.props;
    let Variant = HipchatIconAndWordmark;
    if (collapseTo === 'icon') {
      Variant = HipchatIcon;
    } else if (collapseTo === 'type') {
      Variant = HipchatWordmark;
    }
    return <Variant {...props} />;
  }
}
