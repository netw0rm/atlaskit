import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BitbucketIconAndWordmark from './BitbucketIconAndWordmark';
import BitbucketIcon from './BitbucketIcon';
import BitbucketWordmark from './BitbucketWordmark';

export default class BitbucketLogo extends Component {
  static propTypes = {
    /** If set, the logo will be collapsed down to show only the product icon or product type */
    collapseTo: PropTypes.oneOf(['icon', 'type']),
  }

  render() {
    const { collapseTo, ...props } = this.props;
    let Variant = BitbucketIconAndWordmark;
    if (collapseTo === 'icon') {
      Variant = BitbucketIcon;
    } else if (collapseTo === 'type') {
      Variant = BitbucketWordmark;
    }
    return <Variant {...props} />;
  }
}
