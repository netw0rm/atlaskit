import React, { PropTypes, PureComponent } from 'react';

import { AkNavigationItem } from '@atlaskit/navigation';

export default class Result extends PureComponent {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    href: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func,
    subText: PropTypes.node || PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    /* eslint-enable react/no-unused-prop-types */
  }

  render() {
    return (
      <AkNavigationItem
        {...this.props}
      />
    );
  }
}
