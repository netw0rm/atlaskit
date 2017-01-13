import React, { PureComponent, PropTypes } from 'react';
import {
  action,
  after,
  containerItemInner,
  containerItemOuter,
  hasGlobalAppearance,
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
    appearance: PropTypes.string,
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
    const Icon = () => (this.props.icon ? <div className={icon}>{this.props.icon}</div> : null);

    const TextAfter = () => (this.props.textAfter ?
      <div className={textAfter}>
        {this.props.textAfter}
      </div>
    : null);

    const Action = () => (this.props.action ?
      <div className={action}>
        {this.props.action}
      </div>
    : null);

    const After = ({ children }) => (TextAfter || Action ?
      <div className={after}>
        {children}
      </div>
    : null);

    return (
      <div
        className={className(containerItemOuter, {
          [hasGlobalAppearance]: this.props.appearance === 'global',
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
            <Icon />
            <div className={text}>
              {this.props.text}
            </div>
            <After>
              <TextAfter />
            </After>
          </div>
        </Link>
        <Action />
      </div>
    );
  }
}
