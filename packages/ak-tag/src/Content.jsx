import React, { PureComponent, PropTypes } from 'react';

import Text from './Text';
import Link from './Link';

/* eslint-disable react/prefer-stateless-function */
export default class Content extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
  }

  render = () => {
    if (this.props.href) {
      return (<Link
        href={this.props.href}
      >
        {this.props.children}
      </Link>);
    }
    return <Text>{this.props.children}</Text>;
  }
}
