import React, { PureComponent, PropTypes } from 'react';

export default class DefaultLinkComponent extends PureComponent {
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
    return (href ? <a href={href} onMouseDown={onMouseDown}>{children}</a> : children);
  }
}
