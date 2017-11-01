import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ConfluenceIconAndWordmark from './ConfluenceIconAndWordmark';
import ConfluenceIcon from './ConfluenceIcon';
import ConfluenceWordmark from './ConfluenceWordmark';

export default class ConfluenceLogo extends Component {
  static propTypes = {
    /** If set, the logo will be collapsed down to show only the product icon or product type */
    collapseTo: PropTypes.oneOf(['icon', 'type']),
  }

  render() {
    const { collapseTo, ...props } = this.props;
    let Variant = ConfluenceIconAndWordmark;
    if (collapseTo === 'icon') {
      Variant = ConfluenceIcon;
    } else if (collapseTo === 'type') {
      Variant = ConfluenceWordmark;
    }
    return <Variant {...props} />;
  }
}
