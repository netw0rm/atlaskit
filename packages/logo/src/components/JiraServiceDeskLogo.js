import React, { Component } from 'react';
import PropTypes from 'prop-types';

import JiraServiceDeskIconAndWordmark from './JiraServiceDeskIconAndWordmark';
import JiraServiceDeskIcon from './JiraServiceDeskIcon';
import JiraServiceDeskWordmark from './JiraServiceDeskWordmark';

export default class JiraServiceDeskLogo extends Component {
  static propTypes = {
    /** If set, the logo will be collapsed down to show only the product icon or product type */
    collapseTo: PropTypes.oneOf(['icon', 'type']),
  }

  render() {
    const { collapseTo, ...props } = this.props;
    let Variant = JiraServiceDeskIconAndWordmark;
    if (collapseTo === 'icon') {
      Variant = JiraServiceDeskIcon;
    } else if (collapseTo === 'type') {
      Variant = JiraServiceDeskWordmark;
    }
    return <Variant {...props} />;
  }
}
