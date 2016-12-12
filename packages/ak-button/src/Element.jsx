import React, { PureComponent, PropTypes } from 'react';

import Span from './Span';
import Link from './Link';
import Button from './Button';

export default class Element extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    href: PropTypes.string,
    isDisabled: PropTypes.bool,
  }

  static defaultProps = {
    children: null,
    href: null,
    isDisabled: false,
  }

  render() {
    if (this.props.href) {
      if (this.props.isDisabled) {
        return (<Span {...this.props}>{this.props.children}</Span>);
      }
      return (<Link {...this.props}>{this.props.children}</Link>);
    }
    return (<Button {...this.props}>{this.props.children}</Button>);
  }
}
