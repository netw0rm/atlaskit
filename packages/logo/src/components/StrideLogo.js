import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StrideIconAndWordmark from './StrideIconAndWordmark';
import StrideIcon from './StrideIcon';
import StrideWordmark from './StrideWordmark';

export default class StrideLogo extends Component {
  static propTypes = {
    /** If set, the logo will be collapsed down to show only the product icon or product type */
    collapseTo: PropTypes.oneOf(['icon', 'type']),
  }

  render() {
    const { collapseTo, ...props } = this.props;
    let Variant = StrideIconAndWordmark;
    if (collapseTo === 'icon') {
      Variant = StrideIcon;
    } else if (collapseTo === 'type') {
      Variant = StrideWordmark;
    }
    return <Variant {...props} />;
  }
}
