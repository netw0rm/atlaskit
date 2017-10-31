import React, { Component } from 'react';
import PropTypes from 'prop-types';

import JiraSoftwareIconAndWordmark from './JiraSoftwareIconAndWordmark';
import JiraSoftwareIcon from './JiraSoftwareIcon';
import JiraSoftwareWordmark from './JiraSoftwareWordmark';

export default class JiraSoftwareLogo extends Component {
  static propTypes = {
    /** If set, the logo will be collapsed down to show only the product icon or product type */
    collapseTo: PropTypes.oneOf(['icon', 'type']),
  }

  render() {
    const { collapseTo, ...props } = this.props;
    let Variant = JiraSoftwareIconAndWordmark;
    if (collapseTo === 'icon') {
      Variant = JiraSoftwareIcon;
    } else if (collapseTo === 'type') {
      Variant = JiraSoftwareWordmark;
    }
    return <Variant {...props} />;
  }
}
