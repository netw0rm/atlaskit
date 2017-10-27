import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AtlassianIconAndWordmark from './AtlassianIconAndWordmark';
import AtlassianIcon from './AtlassianIcon';
import AtlassianWordmark from './AtlassianWordmark';

export default class AtlassianLogo extends Component {
  static propTypes = {
    /** If set, the logo will be collapsed down to show only the product icon or product type */
    collapseTo: PropTypes.oneOf(['icon', 'type']),
  }

  render() {
    const { collapseTo, ...props } = this.props;
    let Variant = AtlassianIconAndWordmark;
    if (collapseTo === 'icon') {
      Variant = AtlassianIcon;
    } else if (collapseTo === 'type') {
      Variant = AtlassianWordmark;
    }
    return <Variant {...props} />;
  }
}
