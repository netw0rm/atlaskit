import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';

export default class RouterLinkComponent extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.node,
    onMouseDown: PropTypes.func,
    className: PropTypes.string,
  }

  render() {
    const {
      href,
      children,
      onMouseDown,
      className,
    } = this.props;
    return (href ? <Link
      to={href}
      onMouseDown={onMouseDown}
      className={className}
    >{children}</Link> : children);
  }
}
