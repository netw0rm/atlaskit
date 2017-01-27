import React, { PureComponent, PropTypes } from 'react';

export default class DefaultLinkComponent extends PureComponent {
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
    return (href ? (
      <a
        className={className}
        href={href}
        onMouseDown={onMouseDown}
      >{children}</a>
    ) : children);
  }
}
