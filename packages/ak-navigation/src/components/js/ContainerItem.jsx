import React, { PureComponent, PropTypes } from 'react';
import {
  action,
  containerItemInner,
  containerItemOuter,
  icon,
  isSelected,
  isCompact,
  link,
  text,
  textAfter,
} from 'style!../less/ContainerItem.less';
import className from 'classnames';

export default class ContainerItem extends PureComponent {
  static propTypes = {
    icon: PropTypes.node,
    isCompact: PropTypes.bool,
    isSelected: PropTypes.bool,
    text: PropTypes.node,
    textAfter: PropTypes.node,
    action: PropTypes.node,
    href: PropTypes.string,
    linkComponent: PropTypes.func,
  }

  static defaultProps = {
    isCompact: false,
    isSelected: false,
    linkComponent: ({ href, children, ...props }) =>
      (href ? <a href={href} {...props}>{children}</a> : children),
  }

  onMouseDown = (e) => {
    e.preventDefault();
  }

  render() {
    const Link = this.props.linkComponent;
    return (
      <div
        className={className(containerItemOuter, {
          [isSelected]: this.props.isSelected,
          [isCompact]: this.props.isCompact,
        })}
      >
        <Link
          className={link}
          href={this.props.href}
          onMouseDown={this.onMouseDown}
        >
          <div
            className={containerItemInner}
          >
            {this.props.icon ?
              <div className={icon}>{this.props.icon}</div> : null}
            <div className={text}>{this.props.text}</div>
            <div className={textAfter}>{this.props.textAfter}</div>
          </div>
        </Link>
        <div className={action}>{this.props.action}</div>
      </div>
    );
  }
}
