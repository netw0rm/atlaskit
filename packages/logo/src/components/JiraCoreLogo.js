import React, { Component } from 'react';
import PropTypes from 'prop-types';

import JiraCoreIconAndWordmark from './JiraCoreIconAndWordmark';
import JiraCoreIcon from './JiraCoreIcon';
import JiraCoreWordmark from './JiraCoreWordmark';

export default class JiraCoreLogo extends Component {
  static propTypes = {
    /** If set, the logo will be collapsed down to show only the product icon or product type */
    collapseTo: PropTypes.oneOf(['icon', 'type']),
  }

  render() {
    const { collapseTo, ...props } = this.props;
    let Variant = JiraCoreIconAndWordmark;
    if (collapseTo === 'icon') {
      Variant = JiraCoreIcon;
    } else if (collapseTo === 'type') {
      Variant = JiraCoreWordmark;
    }
    return <Variant {...props} />;
  }
}
