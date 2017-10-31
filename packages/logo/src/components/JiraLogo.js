import React, { Component } from 'react';
import PropTypes from 'prop-types';

import JiraIconAndWordmark from './JiraIconAndWordmark';
import JiraIcon from './JiraIcon';
import JiraWordmark from './JiraWordmark';

export default class JiraLogo extends Component {
  static propTypes = {
    /** If set, the logo will be collapsed down to show only the product icon or product type */
    collapseTo: PropTypes.oneOf(['icon', 'type']),
  }

  render() {
    const { collapseTo, ...props } = this.props;
    let Variant = JiraIconAndWordmark;
    if (collapseTo === 'icon') {
      Variant = JiraIcon;
    } else if (collapseTo === 'type') {
      Variant = JiraWordmark;
    }
    return <Variant {...props} />;
  }
}
