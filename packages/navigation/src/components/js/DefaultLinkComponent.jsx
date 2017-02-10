import React, { PureComponent, PropTypes } from 'react';

export default class DefaultLinkComponent extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.node,
    onMouseDown: PropTypes.func,
    onClick: PropTypes.func,
    className: PropTypes.string,
  }

  render() {
    const {
      href,
      children,
      onClick,
      onMouseDown,
      className,
    } = this.props;
    return (href ? (
      <a
        className={className}
        href={href}
        onMouseDown={onMouseDown}
        onClick={onClick}
      >{children}</a>
    ) : children);
  }
}
