import React, { PureComponent, PropTypes } from 'react';

export default class DefaultLinkComponent extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.node,
    onMouseDown: PropTypes.func,
    className: PropTypes.string,
    onClick: PropTypes.func,
  }

  render() {
    const {
      href,
      children,
      onMouseDown,
      className,
      onClick,
    } = this.props;
    return (href ? (
      <a
        className={className}
        href={href}
        onClick={onClick}
        onMouseDown={onMouseDown}
      >{children}</a>
    ) : children);
  }
}
