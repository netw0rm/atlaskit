import React, { PureComponent, PropTypes } from 'react';

export default class DefaultLinkComponent extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
  }

  render() {
    const {
      children,
      className,
      href,
      onClick,
      onMouseDown,
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
