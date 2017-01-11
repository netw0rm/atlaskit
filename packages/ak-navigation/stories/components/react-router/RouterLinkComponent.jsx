import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';

export default class RouterLinkComponent extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.node,
    onMouseDown: PropTypes.func,
  }

  render() {
    const {
      href,
      children,
      onMouseDown,
    } = this.props;
    return (href ? <Link to={href} onMouseDown={onMouseDown}>{children}</Link> : children);
  }
}
